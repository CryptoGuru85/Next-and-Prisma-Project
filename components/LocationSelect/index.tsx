import React, { FC, useEffect, useState, useRef } from "react";
// import clubs from "./clubs.json";
import cls from "~/utils/classname";
import styles from "./LocationSelect.module.css";
import { FetchClubList } from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";

type ClubSelect = {
    id: number;
    name: string;
}

interface LocationSelectProps {
    name: string;
    label?: string;
    onChange: (value) => void;
}

const LocationSelect: FC<LocationSelectProps> = (props: LocationSelectProps) => {
    const { label, onChange } = props

    const [search, setSearch] = useState<string>("");
    const inputRef = useRef(null)
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();
    const state = useSelector((state:any)=>state);

    const init_club = {id: 1, name: ''};
    const clubs = loading ? [] : state.clubList.map(club => ({ id: club.id, name: club.name }));
    const [club, setClub] = useState<ClubSelect[]>([]);

    const fetchClubList = () => {
        dispatch(FetchClubList(setLoading));
    };
    useEffect(fetchClubList, []);

    const inputClickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    useEffect(() => {
        if (!loading) {
            // console.log(clubs)
            // setClub(clubs[0]);
        }
    }, [loading])

    useEffect(() => {
        if (inputRef) {
            inputRef.current.addEventListener("click", inputClickHandler);
        }
        return () => inputRef.current.removeEventListener("click", inputClickHandler);

    }, [inputRef]);

    const eventListener = (e) => {
        setToggleDropdown(currentDropdownState => !currentDropdownState)
        window.removeEventListener("click", eventListener);
    };

    const setToggleDropdownEx = () => {
        setToggleDropdown(currentDropdownState => !currentDropdownState);
        setTimeout(() => window.addEventListener("click", eventListener), 0);
    };

    const onSelectClick = (newClub) => {
        setClub([...club, newClub]);
        const resultClubs = club.map((clubitem, i) => {
            return i == 0 ? clubitem.name : ', ' + clubitem.name
        });
        const seletedClubs = club.length ? resultClubs + ', ' + newClub.name : newClub.name;
        onChange(seletedClubs);
        // setToggleDropdown(false);
    };

    const removeClub = (selectedClub) => {
        const items = club.filter(item => item.id !== selectedClub.id);
        setClub(items);
    };

    const onSearchChange = (e) => {
        if (e.target.validity.valid)
            setSearch(e.target.value);
    };

    return (
        <div className={styles.mainContainer} >
            <span className={styles.label}>{label}</span>
            <div className={styles.rightWrap}>
                <div className={styles.form}>
                    <div className={styles.dialSelector}>
                        <div onClick={() => setToggleDropdownEx()} className={styles.dialPickerNoBorder}>
                            {
                                club.length ? <span>{club.map((clubitem, i) => {
                                    return i == 0 ? clubitem.name : ', ' + clubitem.name
                                })}</span> 
                                : <span>Select clubs</span>
                            }
                            <div className={cls([styles.chevron, toggleDropdown ? styles.chevronDown : null])} />
                        </div>
                        <div className={cls([styles.dropdownMenu, toggleDropdown ? styles.dropdownMenuShow : null])}>
                            <input ref={inputRef} pattern="\w*" type="text" className={styles.dropdownSearch} value={search} onChange={onSearchChange} placeholder="" />
                            {
                                clubs.filter((val) => RegExp("^\\+?" + search + ".*", "i").test(val.name)).map(v => {
                                    return (
                                        <div onClick={() => onSelectClick(v)} className={styles.dialPicker} key={v.name}>
                                            <span className={styles.countryName}>{v.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    club.length ? <div className={styles.selectedClubs}>
                        {club.map((clubitem, i) => {
                            return <div className={styles.selectedClub}><span>{clubitem.name}</span> <a onClick={() => {removeClub(clubitem)}} ><img src="../icons/close.png" className={styles.selectedClose} /></a></div>
                        })}
                    </div>
                    : ''
                }
            </div>
        </div>
    );
};

export default LocationSelect;