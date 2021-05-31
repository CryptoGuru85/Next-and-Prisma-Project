import React, { FC, useEffect, useState, useRef } from "react";
import valutes from "./valutes.json";
import cls from "~/utils/classname";


import styles from "./ValuteSelect.module.css";


type ValuteSelect = {
    name: string;

}

interface ValuteSelectProps {
    name: string;
    label?: string;
}

const ValuteSelect: FC<ValuteSelectProps> = (props: ValuteSelectProps) => {

    const { label } = props

    const [valute, setValute] = useState<ValuteSelect>(valutes[0]);

    const [search, setSearch] = useState<string>("");



    const inputRef = useRef(null)

    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

    const inputClickHandler = (e) => {

        e.preventDefault();
        e.stopPropagation();
    }

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


    const onSelectClick = (valute) => {
        setValute(valute);
        // setToggleDropdown(false);
    };

    const onSearchChange = (e) => {
        if (e.target.validity.valid)
            setSearch(e.target.value);
    };


    return (
        <div className={styles.mainContainer}>
            <span className={styles.label}>{label}</span>
            <div className={styles.form}>
                <div className={styles.dialSelector}>
                    <div onClick={() => setToggleDropdownEx()} className={styles.dialPickerNoBorder}>
                        <span>{valute.name}</span>
                        <div className={cls([styles.chevron, toggleDropdown ? styles.chevronDown : null])} />
                    </div>
                    <div className={cls([styles.dropdownMenu, toggleDropdown ? styles.dropdownMenuShow : null])}>
                        <input ref={inputRef} pattern="\w*" type="text" className={styles.dropdownSearch} value={search} onChange={onSearchChange} placeholder="" />
                        {
                            valutes.filter((val) => RegExp("^\\+?" + search + ".*", "i").test(val.name)).map(v => {
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
        </div>
    );
};

export default ValuteSelect;