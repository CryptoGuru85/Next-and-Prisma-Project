import React, { FC, useState } from 'react';
import styles from "./AddressPopUpItem.module.css";
import { useTranslation } from "next-i18next";
import { Formik, Field, Form, FormikValues } from "formik";

interface AddressPopUpItemProps {
    secondName: string;
    name: string;
    changeMapLink: (e) => void;
    changeCoordinates: (e) => void;
}

const AddressPopUpItem: FC<AddressPopUpItemProps> = (props: AddressPopUpItemProps) => {

    const { secondName, name, changeMapLink, changeCoordinates } = props

    const { t: tEvents } = useTranslation("events");

    return (
        <div className={styles.mainContainer}>
            <div className={styles.actionContainer}>
                <div className={styles.mapContainer}>
                    <span className={styles.label}>{tEvents("EVENT_ADDRESS_LINK_MAP_LINK")}</span>
                    <div className={styles.inputContainer}>
                        <Field
                            name={name}
                            className={styles.mainInput}
                            onChange={changeMapLink}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.actionContainer}>
                <div className={styles.mapContainer}>
                    <span className={styles.label}>{tEvents("EVENT_ADDRES_LINK_COORDINATES")}</span>
                    <div className={styles.inputContainer}>
                        <Field
                            name={secondName}
                            className={styles.mainInput}
                            onChange={changeCoordinates}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressPopUpItem;