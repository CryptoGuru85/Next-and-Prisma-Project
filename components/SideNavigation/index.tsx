import React, { FC, useState } from "react";
import Chevron from "~/public/icons/chevron.svg"
import cls from "~/utils/classname";
import styles from "./SideNavigation.module.css";
import { useSelector } from "react-redux";
import { State } from "~/redux/store";

interface SideNavigationProps {
    title: string;
    Icon: any;
    children?: JSX.Element | JSX.Element[];
    min?: boolean;
}

/**
 * Боковая навигация.
 * @param props
 */
const SideNavigation: FC<SideNavigationProps> = (props: SideNavigationProps) => {
    const { title, Icon, children, min } = props;
    const toggleIcons = useSelector((state: State) => state.toggleIcons);

    const [minimized, setMinimized] = useState(min || false);

    return (
        <nav className={styles.mainContainer}>
            <div className={styles.title} onClick={() => setMinimized(!minimized)}>
                {
                    toggleIcons ?
                        <>
                            <Icon />
                        </>
                    :
                    <>
                        <span>{title}</span>
                        <div className={cls([styles.chevronIcon, !minimized ? styles.chevronIconActive : null])}><Chevron /></div>
                    </>
                }
            </div>
            <ul className={cls([styles.itemList, !minimized ? styles.itemListActive : null])}>
                {children}
            </ul>
        </nav>
    );
};

export default SideNavigation;