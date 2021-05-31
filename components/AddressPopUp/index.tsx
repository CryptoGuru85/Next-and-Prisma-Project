import React, { FC, useState } from "react";
import { Formik, Field, Form, FormikValues } from "formik";
import styles from "./AddressPopUp.module.css";
import Button, { ButtonType } from "~/components/Button";
import { useTranslation } from "next-i18next";
import PopUp from "~/components/PopUp";
import AddressPopUpItem from "./AddressPopUpItem";

interface AddressPopUpProps {
    name: string;
    label: string;
    onChange: (value) => void;
}

/**
 * Модальное окно с вводом адреса
 * @param props
 */
const AddressPopUp: FC<AddressPopUpProps> = (props: AddressPopUpProps) => {

    const { t: tEvents } = useTranslation("events");

    const { name, label, onChange } = props

    const [toggleActionMenu, setToggleActionMenu] = useState<boolean>(false);
    const [mapLink, setMapLink] = useState<string>("");
    const [coordinates, setCoordinates] = useState<string>("");
    const [addressLinks, setAddressLinks] = useState<string>("");

    const changeMapLink = (e) => {
        setMapLink(e.target.value);
    }

    const changeCoordinates = (e) => {
        setCoordinates(e.target.value);
    }

    const setAddressLink = (e) => {
        e.preventDefault();
        setToggleActionMenu(false);
        let addressValue = '';
        if (mapLink) addressValue += addressValue ? ', ' + mapLink : mapLink;
        if (coordinates) addressValue += addressValue ? ', ' + coordinates : coordinates;
        setAddressLinks(addressValue);
        onChange(mapLink + ', ' + coordinates);
    }

    return (
        <div>
            <div className={styles.inputContainer}>
                <span className={styles.label}>{label}</span>
                <Field
                    onClick={() => setToggleActionMenu(prev => !prev)}
                    name={name}
                    className={styles.mainInput}
                    value={addressLinks}
                />
            </div>
            <div className={styles.field}>
                <PopUp active={toggleActionMenu}>
                    <div className={styles.actionPopUp}>
                        <h3>{tEvents("EVENT_ADDRESS_LINK_TITILE")}</h3>
                        <AddressPopUpItem changeMapLink={changeMapLink} changeCoordinates={changeCoordinates} name={name} secondName="coordinates"/>
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.actionContainer}>
                            <Button type={ButtonType.Button} onClick={()=>setAddressLink} danger={false}>{tEvents("EVENT_ACTION_SAVE")}</Button>
                        </div>
                    </div>
                </PopUp>
            </div>
        </div>
    );
};

export default AddressPopUp;