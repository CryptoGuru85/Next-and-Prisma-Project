import React, { useState } from 'react';
import SideNavigation from "~/components/SideNavigation";
import NavigationItem from "~/components/SideNavigation/NavigationItem";
import Button, { ButtonType } from "~//components/Button";
import InputForm from "~/components/InputForm";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from "react-redux";
import { SetIconsToggled } from "~/redux/actions";
import { SERVER_ADDRESS } from '~/config';

import ToggleIcon from "~/public/icons/ToggleIcon.svg";
import ToggleIconInactive from "~/public/icons/ToggleIconInactive.svg";
import SettingsIcon from "~/public/icons/SettingsIcon.svg";

import ContentTextarea from "~/components/ContentTextarea";
import Tour from "~/components/Tour";
import VideoLink from "~/components/VideoLink";
import FileUploader from "~/components/FileUploader";
import ImageUploader from "~/components/ImageUploader";
import VideoUploader from "~/components/VideoUploader";
import LogoUploader from '~/components/LogoUploader';
import IconButton, { IconButtonType } from "~/components/IconButton";
import styles from "./Content.module.css";

const Content = () => {
    const [images, setImages] = useState<File[]>([]);
    const [logo, setLogo] = useState<File>(null);
    const [videos, setVideos] = useState<File[]>([]);

    // @ts-ignore
    const StateToggleIcons = useSelector(state=>state.toggleIcons);
    const dispatch = useDispatch();
    let formSubmit;

    const onChangeImage = (files) => {
        setImages(files);
    };
    const onChangeVideo = (files) => {
        setVideos(files);
    };
    const onChangeLogo = (file) => {
        setLogo(file);
    };

    const onSubmit = (values) => {
        if (!images.length || !videos.length) return;

        const form = new FormData();
        for (const file of images) {
            form.append("eventPictures[]", file, file.name);
        }
        for (const file of videos) {
            form.append("videoOverview[]", file, file.name);
        }
        // @ts-ignore
        form.append("userId", 1);
        form.append("logo", logo);
        form.append("videoOverviewLink", values.videoOverview);
        form.append("tourLink", values.tour360Link);
        form.append("about", values.about);
        window.onbeforeunload = () => {
            return "You have data to upload.";
        };
        fetch(`${SERVER_ADDRESS}/api/events/1/content`, {method: "POST", body: form}).then((resp)=> {
            console.log("HELLO RESPONSE", resp);
        }).finally(() => {
            window.onbeforeunload = () => {
                return null;
            };
        });
    };

    const { t: tNav } = useTranslation("navigation");
    const { t: tEvents } = useTranslation("events");
    const { t: tContent } = useTranslation("content");

    const initialValues = {
        videoOverview: "",
        tour360Link: "",
        about: "",
    };

    const toggleIcons = () => {
        // @ts-ignore
        dispatch(SetIconsToggled(!StateToggleIcons))
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <h1>{tEvents("EVENTS_TITLE")}</h1>
                <div className={styles.toggleIcon}>
                    {/*@ts-ignore*/}
                    <IconButton type={IconButtonType.Button} Icon={StateToggleIcons ? ToggleIcon : ToggleIconInactive} onClick={toggleIcons} />
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.navigation}>
                    <SideNavigation Icon={SettingsIcon} title={tNav("EVENT_SETTINGS_TITLE")}>
                        <NavigationItem href="/events/create" title={tNav("EVENT_SETTINGS_INFO")} />
                        <NavigationItem href="/events/create/menu" title={tNav("EVENT_SETTINGS_MENU")} />
                        <NavigationItem active={true} href="/events/create/content" title={tNav("EVENT_SETTINGS_CONTENT")} />
                        <NavigationItem href="/events/create/guests" title={tNav("EVENT_SETTINGS_GUESTS")} />
                        <NavigationItem href="/plan/create/" title={tNav("EVENT_SETTINGS_OBJECT_PLAN")}>
                            <NavigationItem href="/events/create/plan-new" title={tNav("EVENT_SETTINGS_OBJECT_PLAN_NEW")} />
                            <NavigationItem href="/plan/1" title="Hole 1" />
                        </NavigationItem>
                    </SideNavigation>
                    </div>
                    <div className={styles.contentTable}>
                        <div className={styles.contentMain}>
                            <h2>{tContent("CONTENT_EVENT_CONTENT")}</h2>
                            <div className={styles.inputForm}>
                                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                    {
                                        formik => {
                                            formSubmit = formik.submitForm;
                                            return (
                                            <Form>
                                                <FileUploader accept="image/png, image/jpeg" multiple={true}>
                                                    {
                                                        (files, setFiles, handleUpload, openDialog) => {
                                                            return (
                                                                <ImageUploader label={tContent("CONTENT_EVENT_PICTURES")} files={files} setFiles={setFiles} handleUpload={handleUpload} openDialog={openDialog} />
                                                            )
                                                        }
                                                    }
                                                </FileUploader>
                                                <FileUploader accept="video/mp4, video/avi" multiple={true}>
                                                    {
                                                        (files, setFiles, handleUpload, openDialog) => {
                                                            return (
                                                                <VideoUploader label={tContent("CONTENT_EVENT_VIDEO_OVERVIEW")} files={files} setFiles={setFiles} handleUpload={handleUpload} openDialog={openDialog} />
                                                            )
                                                        }
                                                    }
                                                </FileUploader>
                                                <VideoLink name="videoOverview"
                                                           label={tContent("CONTENT_EVENT_VIDEO_LINK")}/>
                                                <Tour label={tContent("CONTENT_EVENT_360_TOUR")}/>
                                                <VideoLink name="tour360Link"
                                                           label={tContent("CONTENT_EVENT_360_LINK")}/>
                                                <FileUploader accept="image/png, image/jpeg" multiple={false}>
                                                    {
                                                        (files, setFiles, handleUpload, openDialog) => {
                                                            return (
                                                                <LogoUploader label={tContent("CONTENT_EVENT_LOGO")} files={files} setFiles={setFiles} handleUpload={handleUpload} openDialog={openDialog} />
                                                            )
                                                        }
                                                    }
                                                </FileUploader>
                                                <ContentTextarea name="about"
                                                    label={tContent("CONTENT_EVENT_ABOUT_EVENT")} />
                                            </Form>
                                        )
                                    }
                                }
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
                    <Button type={ButtonType.Button} onClick={() => { formSubmit() }} danger={false}>{tEvents("EVENT_ACTION_SAVE")}</Button>
                </div>
            </div>
        </div>
    )

}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ["header", "footer", "navigation", "events", "content"]),
    },
});



export default Content;