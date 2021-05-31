import React, { FC, useEffect, useState, useRef } from "react";

import cls from "~/utils/classname";
// import countries from "./countries.json";
import styles from "./PhoneInput.module.css";
import { useField } from "formik";
import { useTranslation } from "next-i18next";
import { FetchCountryList } from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";

type CountryPhone = {
    id: number;
    name: string;
    dial_code: string;
    code: string;
}

interface PhoneInputProps {
    name: string;
    label?: string;
}

/**
 * Компонент ввода номера телефона
 * @param props
 */
const PhoneInput: FC<PhoneInputProps> = (props: PhoneInputProps) => {
    const { label } = props;
    const { t } = useTranslation("events");
    const [countryLoading, setCountryLoading] = React.useState(true);
    
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
    const [number, setNumber] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch();
    const state = useSelector((state:any)=>state);

    const countries = countryLoading ? [] : state.countryList.map(country => ({ id: country.id, name: country.name, dial_code: country.dial_code, code: country.code}));
    
    const init_country = {id: 1, name: '', dial_code: '', code: ''};
    const [country, setCountry] = useState<CountryPhone>(init_country);

    const fetchCountryList = () => {
        dispatch(FetchCountryList(setCountryLoading));
    };
    useEffect(fetchCountryList, []);

    useEffect(() => {
        if (!countryLoading) {
            setCountry(countries[0]);
        }
    }, [countryLoading])

    const inputRef = useRef(null)

    // @ts-ignore
    const [field, meta, helpers] = useField(props);

    useEffect(() => {
        helpers.setValue(`${country.dial_code}${number}`);
    }, [number, country]);

    const inputClickHandler = (e)=>{      
        e.preventDefault();
        e.stopPropagation();
    }

    useEffect(()=>{
        if(inputRef){
            inputRef.current.addEventListener("click", inputClickHandler );
        }
        return ()=>inputRef.current.removeEventListener("click", inputClickHandler );

    }, [inputRef]);

    const eventListener = (e) => {
        setToggleDropdown(currentDropdownState=>!currentDropdownState)
        window.removeEventListener("click", eventListener);
    };

    const setToggleDropdownEx = () => {
        setToggleDropdown(currentDropdownState=>!currentDropdownState);
        setTimeout( () => window.addEventListener("click", eventListener), 0);
    };

    const onSelectClick = (country) => {
        setCountry(country);
        // setToggleDropdown(false);
    };

    const onPhoneChange = (e) => {
        if ( e.target.validity.valid )
            setNumber(e.target.value)
    };

    const onSearchChange = (e) => {
        if ( e.target.validity.valid )
            setSearch(e.target.value);
    };

    return (
        <div className={styles.mainContainer} >
            <span className={styles.label}>{label || t("EVENT_INFO_EVENT_PHONE")}</span>
            <div className={styles.form}>
                <div className={styles.dialSelector}>
                    <div onClick={() => setToggleDropdownEx()} className={styles.dialPickerNoBorder}>
                        <span>{country.dial_code ? country.dial_code : ''}</span>
                        <div className={styles.flag} style={{backgroundImage: `url("/images/flags/${country.code}.png")`}} />
                        <div className={cls([styles.chevron, toggleDropdown ? styles.chevronDown : null])} />
                    </div>
                    <div className={cls([styles.dropdownMenu, toggleDropdown ? styles.dropdownMenuShow : null])}>
                        <input ref={inputRef} pattern="\w*" type="text" className={styles.dropdownSearch} value={search} onChange={onSearchChange} placeholder={t("EVENT_INFO_EVENT_PHONE_SEARCH")} />
                        {
                            countries.filter((val) => RegExp("^\\+?" + search + ".*", "i").test(val.name) ||
                                                      RegExp("^\\+?" + search + ".*", "i").test(val.dial_code)).map(v => {
                                return (
                                    <div onClick={() => onSelectClick(v)} className={styles.dialPicker} key={v.name}>
                                        <div className={styles.flag} style={{backgroundImage: `url("/images/flags/${v.code}.png")`}} />
                                        <span className={styles.countryName}>{v.name}</span>
                                        <span className={styles.countryCode}>{v.dial_code}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <input pattern="[0-9]*" className={styles.phoneInput} type="tel" value={number} onChange={onPhoneChange}/>
            </div>
        </div>
    );
};

export default PhoneInput;