import React, { FC, useState } from 'react';
import styles from "./MenuSelect.module.css";
import { useTranslation } from "next-i18next";
import cls from "~/utils/classname";
import Link from "next/link";


interface MenuSelectProps {

}



const MenuSelect: FC<MenuSelectProps> = (props: MenuSelectProps) => {


    const { t: tNav } = useTranslation("navigation");
    const { t: tMenu } = useTranslation("menu");


    const [fullMenuActive, setFullMenuActive] = useState(false);

    return (
        <div className={styles.fileUploader}>
            <div className={styles.menu}>
                <span>
                    <h1
                        onClick={() => setFullMenuActive(prev => !prev)}
                        className={cls([styles.title, fullMenuActive ? null : styles.active])}
                    >
                        {tMenu("MENU_SELECT_MENU")}
                    </h1>
                </span>
                <span>
                    <h1
                        onClick={() => setFullMenuActive(prev => !prev)}
                        className={cls([styles.title, !fullMenuActive ? null : styles.active])}
                    >
                        {tMenu("MENU_SELECT_FULLMENU")}
                    </h1>
                </span>
            </div>
        </div>
    )

}



export default MenuSelect;