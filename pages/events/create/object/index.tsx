import React, { useState } from 'react';
import SideNavigation from "~/components/SideNavigation";
import NavigationItem from "~/components/SideNavigation/NavigationItem";
import styles from "./Object.module.css";
import Button, { ButtonType } from "~//components/Button";
import ObjectField from "~/components/ObjectField";
import { Form, Formik, FormikValues } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Plus from "~/public/icons/plusInactive.svg";
import IconButton, { IconButtonType } from "~/components/IconButton";
import SettingsIcon from "~/public/icons/SettingsIcon.svg";

const ObjectPlan = () => {

    const { t: tNav } = useTranslation("navigation");
    const { t: tEvents } = useTranslation("events");

    const [qr, setQr] = useState<File[]>([]);


    const onChangeQr = (files) => {
        setQr(files);
    }


    const initialValues = {

    };

    const onSubmit = (values: FormikValues) => {

    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <h1>{tEvents("EVENTS_TITLE")}</h1>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.navigation}>
                    <SideNavigation Icon={SettingsIcon} title={tNav("EVENT_SETTINGS_TITLE")}>
                        <NavigationItem href="/events/create/event" title={tNav("EVENT_SETTINGS_INFO")} />
                        <NavigationItem href="/events/create/menu" title={tNav("EVENT_SETTINGS_MENU")} />
                        <NavigationItem href="/events/create/content" title={tNav("EVENT_SETTINGS_CONTENT")} />
                        <NavigationItem href="/events/create/guests" title={tNav("EVENT_SETTINGS_GUESTS")} />
                        <NavigationItem href="/plan/create/" title={tNav("EVENT_SETTINGS_OBJECT_PLAN")}>
                            <NavigationItem href="/events/create/plan-new" title={tNav("EVENT_SETTINGS_OBJECT_PLAN_NEW")} />
                            <NavigationItem href="/plan/1" title="Hole 1" />
                        </NavigationItem>
                    </SideNavigation>
                </div>
                <div className={styles.contentTable}>
                    <div className={styles.contenMain}>
                        <div className={styles.inputForm}>
                            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                <Form>
                                    <ObjectField name="table" label="Table 1" />
                                    <ObjectField name="table" label="Table 1" />
                                    <div className={styles.icon}>
                                        <IconButton type={IconButtonType.Button} disabled={true} Icon={Plus} />
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.actionContainer}>
                    <Button type={ButtonType.Button} danger={true}>{tEvents("EVENT_ACTION_DELETE")}</Button>
                    <Button type={ButtonType.Button} danger={false}>{tEvents("EVENT_ACTION_PREVIEW")}</Button>
                    <Button type={ButtonType.Button} danger={false} disabled={true}>{tEvents("EVENT_ACTION_OFF")}</Button>
                    <Button type={ButtonType.Button} danger={false}>{tEvents("EVENT_ACTION_SAVE")}</Button>
                </div>
            </div>
        </div>
    )

}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ["header", "footer", "navigation", "events", "content", "participants"]),
    },
});



export default ObjectPlan;