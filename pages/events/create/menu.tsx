import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Form, Formik, FormikValues } from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_ADDRESS } from "~/config";

import ImageUploader from "~/components/ImageUploader";
import MenuSelect from "~/components/MenuSelect";
import FileUploader from "~/components/FileUploader";
import SideNavigation from "~/components/SideNavigation";
import NavigationItem from "~/components/SideNavigation/NavigationItem";
import OptionSelect from "~/components/OptionSelect";
import Button, { ButtonType } from "~/components/Button";

import ToggleIcon from "~/public/icons/ToggleIcon.svg";
import ToggleIconInactive from "~/public/icons/ToggleIconInactive.svg";
import SettingsIcon from "~/public/icons/SettingsIcon.svg";
import SecurityIcon from "~/public/icons/SecurityIcon.svg";

import mainStyles from "~/pages/events/Events.module.css";
import styles from "~/pages/events/menu.module.css";
import { SetIconsToggled } from "~/redux/actions";
import IconButton, { IconButtonType } from "~/components/IconButton";

// PLS HALP ME!!11

const Menu = () => {
    const { t: tNav } = useTranslation("navigation");
    const { t: tEvents } = useTranslation("events");
    const { t: tMenu } = useTranslation("menu");
    const { t: tContent } = useTranslation("content");

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [kitchenOptions, setKitchenOptions] = useState(new Map<string, string>());
    const [facilitiesOptions, setFacilitiesOptions] = useState(new Map<string, string>());
    const [menuOptions, setMenuOptions] = useState(new Map<string, string>());

    useEffect(() => {
        // @ts-ignore
        fetch(`${SERVER_ADDRESS}/api/events/${state.eventId || 1}/menu`)
            .then((res) => res.json())
            .then((json) => {
                setFacilitiesOptions(new Map(json.data.facilities.map((v) => [String(v.id), v.name])));
                setKitchenOptions(new Map(json.data.kitchens.map((v) => [String(v.id), v.name])));
                setMenuOptions(new Map(json.data.specialMenu.map((v) => [String(v), v])));
            })
            .catch((err) => {
                console.log("WTF HAPPENED?", err);
            });
    }, []);

    let formSubmit;
    let setValues;

    const initialValues = {
        kitchen: [],
        specialMenu: [],
        facilities: [],
        averagePrice: "",
    };

    const averagePrices = new Map<string, string>([
        ["100", "100$"],
        ["200", "200$"],
        ["500", "500$"],
    ]);
    const onSubmit = (values: FormikValues) => {
        const newValues = {
            ...values,
            averagePrice: parseInt(values.averagePrice),
        };

        // @ts-ignore
        fetch(`${SERVER_ADDRESS}/api/events/${state.eventId || 1}/menu/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify(newValues),
            }).then((r) => {
                console.log("Ok")
            }).catch(err => {
                console.log("WTF HAPPENED?", err);
            });
    };

    const onDelete = () => {
        setValues(initialValues);
    };

    const toggleIcons = () => {
        // @ts-ignore
        dispatch(SetIconsToggled(!state.toggleIcons))
    };
    return (
        <div className={mainStyles.mainContainer}>
            <div className={mainStyles.title}>
                <h1>{tEvents("EVENTS_TITLE")}</h1>
                <div className={mainStyles.toggleIcon}>
                    {/*@ts-ignore*/}
                    <IconButton type={IconButtonType.Button} Icon={state.toggleIcons ? ToggleIcon : ToggleIconInactive} onClick={toggleIcons} />
                </div>
            </div>
            <div className={mainStyles.contentContainer}>
                <div className={mainStyles.navigation}>
                    <SideNavigation Icon={SettingsIcon} title={tNav("EVENT_SETTINGS_TITLE")}>
                        <NavigationItem href="/events/create/" title={tNav("EVENT_SETTINGS_INFO")} />
                        <NavigationItem active={true} href="/events/create/menu" title={tNav("EVENT_SETTINGS_MENU")} />
                        <NavigationItem href="/events/create/content" title={tNav("EVENT_SETTINGS_CONTENT")} />
                        <NavigationItem href="/events/create/guests" title={tNav("EVENT_SETTINGS_GUESTS")} />
                        <NavigationItem href="/plan/create/" title={tNav("EVENT_SETTINGS_OBJECT_PLAN")}>
                            <NavigationItem href="/events/create/plan-new" title={tNav("EVENT_SETTINGS_OBJECT_PLAN_NEW")} />
                            <NavigationItem href="/plan/1" title="Hole 1" />
                        </NavigationItem>
                    </SideNavigation>
                    <SideNavigation Icon={SecurityIcon} title={tNav("SECURITY_TITLE")}>
                        <NavigationItem href="/security/password" title={tNav("SECURITY_PASSWORD_SETTINGS")} />
                        <NavigationItem href="/security/accounts" title={tNav("SECURITY_ENTER_IN_ACCOUNTS")} />
                        <NavigationItem href="/security/tfa" title={tNav("SECURITY_TFA")} />
                        <NavigationItem href="/security/confidentiality" title={tNav("SECURITY_CONFIDENTIALITY")} />
                        <NavigationItem href="/security/delete-account" title={tNav("SECURITY_DELETE_ACCOUNT")} />
                    </SideNavigation>
                </div>
                <div className={mainStyles.eventTable}>
                    <h2>{tMenu("MENU_TITLE")}</h2>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} >
                        {formik => {
                            formSubmit = formik.submitForm;
                            setValues = formik.setValues;
                            return (
                                <Form>
                                    <OptionSelect name="kitchen" isMulti={true} label={tMenu("MENU_KITCHEN_TITLE")}
                                        options={kitchenOptions} onChange={(e) => console.log(e)} />
                                    <OptionSelect name="specialMenu" isMulti={true} label={tMenu("MENU_SPECIAL_TITLE")}
                                        options={menuOptions} onChange={()=>{}} />
                                    <OptionSelect name="facilities" isMulti={true}
                                        label={tMenu("MENU_FACILITIES_TITLE")} options={facilitiesOptions}
                                        onChange={()=>{}} />
                                    <OptionSelect name="averagePrice" isMulti={false}
                                        label={tMenu("MENU_AVERAGE_PRICES_TITLE")} options={averagePrices}
                                        onChange={()=>{}} />
                                    <div className={styles.fileUploader}>
                                        <MenuSelect/>
                                        <FileUploader accept="image/png, image/jpeg" multiple={true}>
                                            {
                                                (files, setFiles, handleUpload, openDialog) => {
                                                    return (
                                                        <ImageUploader label={tContent("CONTENT_EVENT_PICTURES")} files={files} setFiles={setFiles} handleUpload={handleUpload} openDialog={openDialog} />
                                                    )
                                                }
                                            }
                                        </FileUploader>
                                    </div>
                                </Form>
                            )
                        }
                        }
                    </Formik>
                </div>
            </div>
            <div className={mainStyles.actions}>
                <div className={mainStyles.actionContainer}>
                    <Button type={ButtonType.Button} onClick={onDelete} danger={true}>{tEvents("EVENT_ACTION_DELETE")}</Button>
                    <Button type={ButtonType.Button} danger={false}>{tEvents("EVENT_ACTION_PREVIEW")}</Button>
                    <Button type={ButtonType.Button} danger={false} disabled={true}>{tEvents("EVENT_ACTION_CANCEL")}</Button>
                    <Button type={ButtonType.Button} onClick={() => { formSubmit() }} danger={false}>{tEvents("EVENT_ACTION_SAVE")}</Button>
                </div>
            </div>

        </div>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ["header", "footer", "navigation", "events", "menu"]),
    },
});

export default Menu;