import React, { FC, useState } from 'react';
import styles from "./ObjectField.module.css";
import ObjectFieldItem from "./ObjectFieldItem";
import { useTranslation } from "next-i18next";
import PopUp from "~/components/PopUp";
import QrCode from "~/components/QrCode"
import QrActive from "~/public/icons/qrActive.svg"

interface ObjectFieldItemProps {
    name: string;
    label: string;
}



const ObjectField: FC<ObjectFieldItemProps> = (props: ObjectFieldItemProps) => {

    const { t: tNav } = useTranslation("navigation");
    const { t: tEvents } = useTranslation("events");

    const [toggleActionMenu, setToggleActionMenu] = useState<boolean>(false);

    const { name, label } = props;


    return (
        <div className={styles.mainContainer}>
            <div className={styles.formLable}>
                <ObjectFieldItem
                    name={name}
                    label={label}
                />
                <div className={styles.popFieldUp} onClick={() => setToggleActionMenu(prev => !prev)}>
                    <div className={styles.qrActive}>
                        <QrActive />
                    </div>
                </div>
                <div className={styles.field}>
                    <PopUp active={toggleActionMenu}>
                        <div className={styles.actionPopUp}>
                            <QrCode />
                        </div>
                    </PopUp>
                </div>
            </div>
        </div>
    )

}



export default ObjectField;