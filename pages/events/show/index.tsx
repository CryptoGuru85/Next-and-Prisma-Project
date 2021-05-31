import React, { useEffect, useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import styles from "./ShowEvent.module.css";

const Events = () => {
    const { t: tEvents } = useTranslation("events");

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <h1>Show Event Page</h1>
            </div>
        </div>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ["header", "footer", "navigation", "events"]),
    },
});

export default Events;
