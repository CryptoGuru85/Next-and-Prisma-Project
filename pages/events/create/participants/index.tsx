import React, { useState } from 'react';
import SideNavigation from "~/components/SideNavigation";
import NavigationItem from "~/components/SideNavigation/NavigationItem";
import styles from "./Participants.module.css";
import Button, { ButtonType } from "~//components/Button";
import InputForm from "~/components/InputForm";
import { Form, Formik, FormikValues } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SocialLink from "~/components/SocialLink";
import WrapDataPicker from "~/components/WrapDatePicker";
import ContentTextarea from "~/components/ContentTextarea";
import VideoLink from "~/components/VideoLink";
import SettingsIcon from "~/public/icons/SettingsIcon.svg";
import FileUploader from "~/components/FileUploader";
import PhotoUploader from "~/components/PhotoUploader";


const Content = () => {

    const { t: tNav } = useTranslation("navigation");
    const { t: tEvents } = useTranslation("events");
    const { t: tParticipants } = useTranslation("participants");


    const [photo, setPhoto] = useState<File>(null);

    const onChangePhoto = (file) => {
        setPhoto(file);
    }
    const changeSocialLink = (value) => {
     
    }
    const initialValues = {};

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
                        <NavigationItem href="/events/create" title={tNav("EVENT_SETTINGS_INFO")}/>
                        <NavigationItem href="/events/create/menu" title={tNav("EVENT_SETTINGS_MENU")}/>
                        <NavigationItem href="/events/create/content" title={tNav("EVENT_SETTINGS_CONTENT")}/>
                        <NavigationItem href="/events/create/guests" title={tNav("EVENT_SETTINGS_GUESTS")}/>
                        <NavigationItem href="/plan/create/" title={tNav("EVENT_SETTINGS_OBJECT_PLAN")}>
                            <NavigationItem href="/events/create/plan-new"
                                title={tNav("EVENT_SETTINGS_OBJECT_PLAN_NEW")} />
                            <NavigationItem href="/plan/1" title="Hole 1" />
                        </NavigationItem>
                    </SideNavigation>
                </div>
                <div className={styles.contentTable}>
                    <div className={styles.contenMain}>
                        <div className={styles.inputForm}>
                            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                <Form>
                                    <InputForm name="GuestName" label={tParticipants("PARTICIPANTS_GUEST_NAME")} />
                                    <FileUploader accept="image/png, image/jpeg" multiple={false}>
                                        {
                                            (files, setFiles, handleUpload, openDialog) => {
                                                return (
                                                    <PhotoUploader label="Guest photo" files={files} setFiles={setFiles} handleUpload={handleUpload} openDialog={openDialog} />
                                                )
                                            }
                                        }
                                    </FileUploader>
                                    <SocialLink onChange={changeSocialLink} name="Social link" label={tEvents("EVENT_INFO_EVENT_SOCIAL_LINK")} />
                                    <VideoLink name="WebsiteLink" label={tParticipants("PARTICIPANTS_WEBSITE_LINK")} />
                                    <WrapDataPicker name="workingTime" />
                                    <ContentTextarea name="AboutGuest"
                                        label={tParticipants("PARTICIPANTS_ABOUT_GUEST")} />
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
                    <Button type={ButtonType.Button} danger={false}
                        disabled={true}>{tEvents("EVENT_ACTION_OFF")}</Button>
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


export default Content;