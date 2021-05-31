import React, { FC } from "react";
import Link from "next/link";
import Logo from "~/public/icons/logo.svg";
import Search from "~/public/icons/search.svg";
import Heart from "~/public/icons/heart.svg";
import Cart from "~/public/icons/cart.svg";
import User from "~/public/icons/user.svg";
import styles from "./Header.module.css";
import MenuList, { MenuListType } from "../MenuList";
import IconButton, { IconButtonType } from "../IconButton";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

/**
 * Header сайта
 * @param props
 */
const Header: FC = (props) => {
    const { t } = useTranslation("header");

    const router = useRouter();
    const langElements = [
        {
            title: "En",
            type: MenuListType.Link,
            href: router.route,
            locale: "en"
        },
        {
            title: "Ru",
            type: MenuListType.Link,
            href: router.route,
            locale: "ru"
        },
    ]
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <Link href="/"><a>
                    <Logo />
                </a></Link>
            </div>
            <div className={styles.headerMainContainer}>
                <div className={styles.headerMainContainerWrapper}>
                    <nav>
                        <ul className={styles.headerNavigation}>
                            <li><MenuList title={t("NAVIGATION_EVENTS_TITLE")} type={MenuListType.Link} href="/events" /></li>
                            <li><MenuList title={t("NAVIGATION_HOUSING_TITLE")} type={MenuListType.Button}><span>hello</span></MenuList></li>
                            <li><MenuList title={t("NAVIGATION_CLUBS_TITLE")} type={MenuListType.Link} href="/clubs" /></li>
                            <li><MenuList title={t("NAVIGATION_RENT_TRANSPORT_TITLE")} type={MenuListType.Button} /></li>
                        </ul>
                    </nav>
                    <div className={styles.userSection}>
                        <MenuList title={router.locale.charAt(0).toUpperCase() + router.locale.slice(1)} type={MenuListType.Button} elements={langElements} />
                        <nav>
                            <ul className={styles.userSectionNav}>
                                <li><IconButton type={IconButtonType.Button} Icon={Search} onClick={() => { console.log("HOlA")}} /></li>
                                <li><IconButton type={IconButtonType.Button} Icon={Heart} onClick={() => { console.log("HOlA")}} /></li>
                                <li><IconButton type={IconButtonType.Button} Icon={Cart} onClick={() => { console.log("HOlA")}} /></li>
                                <li><IconButton type={IconButtonType.Button} Icon={User} onClick={() => { console.log("HOlA")}} /></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;