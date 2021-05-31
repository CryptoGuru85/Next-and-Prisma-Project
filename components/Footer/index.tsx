import React, { FC } from "react";
import Link from "next/link";
import Logo from "~/public/icons/logo.svg";

import styles from "./Footer.module.css";
import SubscribeForm from "../SubscribeForm";
import { useTranslation } from "next-i18next";

/**
 * Footer сайта
 * @param props
 */
const Footer: FC = (props) => {
    const { t } = useTranslation("footer");

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLogoContainer}>
                    <div className={styles.footerLogo}>
                        <Logo />
                        <h1>Double bubble</h1>
                    </div>
                    <p className={styles.footerLogoLegal}>{t("COPYRIGHT")}</p>
                </div>
                <nav>
                    <ul className={styles.footerNavigation}>
                        <li><Link href="/"><a>{t("NAVIGATION_ONLINE_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_LIVE_STREAM_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_EVENTS_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_RESTAURANTS_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_CLUBS_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_PLACES_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_VILLAS_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_RENT_TRANSPORT_TITLE")}</a></Link></li>
                    </ul>
                    <ul className={styles.footerNavigation}>
                        <li><Link href="/"><a>{t("NAVIGATION_PLOTS_OF_LAND_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_HOUSING_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_LAWYERS_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_MAGIC_PEOPLE_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_JOB_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_MARKET_PLACE_TITLE")}</a></Link></li>
                    </ul>
                    <ul className={styles.footerNavigation}>
                        <li><Link href="/"><a>{t("NAVIGATION_SUPPORT_TITLE")}</a></Link></li>
                        <li><Link href="/"><a>{t("NAVIGATION_VACANCIES_TITLE")}</a></Link></li>
                        <li><SubscribeForm /></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;