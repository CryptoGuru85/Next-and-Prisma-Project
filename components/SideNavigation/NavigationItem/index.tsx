import React, { FC } from "react";
import Link from "next/link";
import cls from "~/utils/classname";
import styles from "./NavigationItem.module.css";

interface NavigationItemProps {
    title: string;
    active?: boolean;
    danger?: boolean;
    href: string;
    children?: JSX.Element | JSX.Element[];
}

/**
 * Элемент боковой навигации.
 * @param props
 */
const NavigationItem: FC<NavigationItemProps> = (props: NavigationItemProps) => {
    const { title, active, children, href } = props;

    return (
        <li className={styles.mainContainer}>
            <Link href={href}><a className={cls([styles.title, active ? styles.titleActive : null])}>{title}</a></Link>
            <ul className={styles.itemList}>
                {children}
            </ul>
        </li>
    );
};

export default NavigationItem;