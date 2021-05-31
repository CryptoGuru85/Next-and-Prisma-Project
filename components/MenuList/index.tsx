import React, { FC } from "react";
import Link from "next/link";
import Icon from "~/public/icons/chevron.svg";
import styles from "./MenuList.module.css";

export enum MenuListType {
    Link,
    Button
}

interface MenuListProps {
    title: string;
    type: MenuListType;
    href?: string;
    locale?: string;
    onClick?: () => void;
    elements?: MenuListProps[];
}

/**
 * Выпадающее меню
 * @param props
 * @constructor
 */
const MenuList: FC<MenuListProps> = (props: MenuListProps) => {
    const { title, type, href, locale, onClick, elements } = props;

    return (
        <div className={styles.mainContainer}>
            {
                type === MenuListType.Link ?
                    <div className={styles.contentContainer}>
                        <Link href={href} locale={locale}><a className={styles.title}>{title}</a></Link>
                        {
                            elements && elements.length > 0 ?
                                <Icon className={styles.icon}/>
                            :
                                <></>
                        }
                    </div>
                :
                    <div className={styles.contentContainer}>
                        <a className={styles.title} onClick={onClick}>{title}</a>
                        {
                            elements && elements.length > 0 ?
                                <Icon className={styles.icon}/>
                            :
                                <></>
                        }
                    </div>
            }
            <div className={styles.dropdownMenu}>
                {
                    elements && elements.length > 0 ?
                        elements.map((elem, i) => {
                            if ( elem.type === MenuListType.Button )
                                return <span onClick={elem.onClick} key={elem.title} className={styles.button}>{elem.title}</span>
                            if ( elem.type === MenuListType.Link )
                                return <Link href={elem.href} locale={elem.locale} key={elem.title}><a className={styles.button}>{elem.title}</a></Link>
                        })
                        : <></>
                }
            </div>
        </div>
    );
};

export default MenuList;
