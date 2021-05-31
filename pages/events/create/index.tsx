import React, {useState}  from 'react';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch, useSelector } from "react-redux";
import { AddEventInfo, SetEventId, SetIconsToggled, UndoEventInfo } from "~/redux/actions";
import { Form, Formik, FormikValues } from "formik";
import { SERVER_ADDRESS } from '~/config';

import ToggleIconInactive from "~/public/icons/ToggleIconInactive.svg";
import ToggleIcon from "~/public/icons/ToggleIcon.svg";
import SettingsIcon from "~/public/icons/SettingsIcon.svg";
import SecurityIcon from "~/public/icons/SecurityIcon.svg";

import LocationSelect from '~/components/LocationSelect';
import IconButton, { IconButtonType } from "~/components/IconButton";
import SideNavigation from "~/components/SideNavigation";
import NavigationItem from "~/components/SideNavigation/NavigationItem";
import Button, { ButtonType } from "~/components/Button";
import InputForm from "~/components/InputForm";
import SocialLink from "~/components/SocialLink";
import AddressModal from "~//components/AddressModal";
import PhoneInput from "~/components/PhoneInput";
import WrapDataPicker from "~/components/WrapDatePicker";
import AddressPopUp from "~/components/AddressPopUp";

import styles from "~/pages/events/create/Event.module.css";
import mainStyles from "~/pages/events/Events.module.css";

export type EventInfoValues = {
    author: string;
    eventName: string;
    siteName: string;
    phone: string;
    workingTime: WorkingTime;
    image: string;
    ticketprice: number;
    status: number;
    publication: number;
    dateCreate: Date;
    userId: number;
}

export type WorkingTime = {
    from: Date;
    to: Date;
}

const EventInfo = (props) => {
    const { t: tNav } = useTranslation("navigation");
    const { t: tEvents } = useTranslation("events");

    const [socialLink, setSocialLink] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [addressLink, setAddressLink] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    // @ts-ignore
    const StateToggleIcons = useSelector(state=>state.toggleIcons);
    const dispatch = useDispatch();

    // @ts-ignore
    const eventInfoStates = useSelector(state=>state.eventInfoStates);

    let formSubmit;
    let setValues;

    const locationOptions = new Map<string, string>([
        ["primadesky", "Night Club Primade sky"],
        ["primade", "Club Primade"],
        ["sky", "Night Club Sky"],
    ]);
    
    const addressLinkOptions = new Map<string, string>([
        ["google1", "https://goo.gl/maps/962uABEMZtvGhMVa7"],
        ["google2", "https://goo.gl/maps/ASDMZdWFsa53S"],
    ]);

    const addressOptions = new Map<string, string>([
        ["addres1", "address 1"],
        ["addres2", "address 2"],
        ["addres3", "address 3"],
    ]);

    const initialValues: EventInfoValues = {
        author: "",
        eventName: "",
        siteName: "",
        phone: "",
        workingTime: { from: new Date(), to: new Date() },
        image: "",
        ticketprice: 0,
        status: 0,
        publication: 0,
        dateCreate: new Date(),
        userId: 1
    };

    const changeAddressLink = (value) => {
        setAddressLink(value);
    }

    const changeSocialLink = (value) => {
        setSocialLink(value);
    }

    const changeAddress = (value) => {
        setAddress(value);
    }

    const changeLocation = (value) => {
        setLocation(value);
    }

    const onSubmit = (values: FormikValues) => {
        dispatch(async (dispatch) => {
            let socialLinks = socialLink.split(', ');

            const newValues = {
                ...values,
                workingTimeFrom: values.workingTime.from,
                workingTimeTo: values.workingTime.to,
                facebookLink: socialLinks[1],
                instagramLink: socialLinks[0],
                address: address,
                mapLink: addressLink,
                club: location
            };
            // @ts-ignore
            delete newValues.workingTime;

            const response = await fetch(`${SERVER_ADDRESS}/api/events`, { method: "POST", headers: {"Content-Type": "application/json;charset=utf-8"}, body: JSON.stringify(newValues) });
            const json = await response.json();
            if (json.status) alert('New event added successfully!')

            dispatch(SetEventId(json.data.id));
        });
    };

    const onFormikChange = (values) => {
        if ( eventInfoStates[eventInfoStates.length - 2] != values )
            dispatch(AddEventInfo(values));
    };

    const onCancel = () => {
        dispatch(UndoEventInfo());
        if ( eventInfoStates.length > 1 ) {
            setValues(eventInfoStates[eventInfoStates.length - 2]);
        }
    };

    const clearAll = () => {
        setValues(initialValues);
        dispatch(AddEventInfo(initialValues));
    };

    const toggleIcons = () => {
        // @ts-ignore
        dispatch(SetIconsToggled(!StateToggleIcons))
    };

    return (
        <div className={styles.eventMainContainer}>
            <div className={styles.title}>
                <h1>{tEvents("EVENTS_TITLE")}</h1>
                <div className={styles.toggleIcon}>
                    {/*@ts-ignore*/}
                    <IconButton type={IconButtonType.Button} Icon={StateToggleIcons ? ToggleIcon : ToggleIconInactive} onClick={toggleIcons} />
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={mainStyles.navigation}>
                    <SideNavigation Icon={SettingsIcon} title={tNav("EVENT_SETTINGS_TITLE")}>
                        <NavigationItem active={true} href="/events/create" title={tNav("EVENT_SETTINGS_INFO")} />
                        <NavigationItem href="/events/create/menu" title={tNav("EVENT_SETTINGS_MENU")} />
                        <NavigationItem href="/events/create/content" title={tNav("EVENT_SETTINGS_CONTENT")} />
                        <NavigationItem href="/events/create/guests" title={tNav("EVENT_SETTINGS_GUESTS")} />
                        <NavigationItem href="/plan/create/" title={tNav("EVENT_SETTINGS_OBJECT_PLAN")}>
                        <NavigationItem href="/events/create/plan-new" title={tNav("EVENT_SETTINGS_OBJECT_PLAN_NEW")} />
                        <NavigationItem href="/plan/1" title="Hole 1" />
                        </NavigationItem>
                    </SideNavigation>
                    <SideNavigation Icon={SecurityIcon} title={tNav("SECURITY_TITLE")}>
                        <NavigationItem href="/security/password" title={tNav("SECURITY_PASSWORD_SETTINGS")}/>
                        <NavigationItem href="/security/accounts" title={tNav("SECURITY_ENTER_IN_ACCOUNTS")} />
                        <NavigationItem href="/security/tfa" title={tNav("SECURITY_TFA")} />
                        <NavigationItem href="/security/confidentiality" title={tNav("SECURITY_CONFIDENTIALITY")} />
                        <NavigationItem href="/security/delete-account" title={tNav("SECURITY_DELETE_ACCOUNT")} />
                    </SideNavigation>
                </div>
                <div className={styles.eventContainer}>
                    <div className={styles.eventMain}>
                        <h2>{tEvents("EVENT_INFO_TITLE")}</h2> 
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={onFormikChange}>
                            {formik=>{
                                formSubmit = formik.submitForm;
                                setValues = formik.setValues;
                                return (
                                    <Form>
                                        <InputForm name="author" label={tEvents("EVENT_INFO_EVENT_AUTHOR")}/>
                                        <InputForm name="eventName" label={tEvents("EVENT_INFO_EVENT_EVENT_NAME")}/>
                                        <InputForm name="siteName" label={tEvents("EVENT_INFO_EVENT_SITENAME")}/>
                                        <SocialLink onChange={changeSocialLink} name="socialLink" label={tEvents("EVENT_INFO_EVENT_SOCIAL_LINK")}/>
                                        <PhoneInput name="phone"/>
                                        <WrapDataPicker name="workingTime"/>
                                        <AddressModal onChange={changeAddress} name="address" label={tEvents("EVENT_INFO_EVENT_ADDRESS")}/>
                                        <LocationSelect onChange={changeLocation} name="location" label={tEvents("EVENT_INFO_EVENT_LOCATION")} />
                                        <AddressPopUp onChange={changeAddressLink} name="addressLink" label={tEvents("EVENT_INFO_EVENT_ADDRESS_LINK")}/>
                                    </Form>
                                )
                            }

                            }
                        </Formik>       
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.actionContainer}>
                    <Button type={ButtonType.Button} danger={true} onClick={clearAll}>{tEvents("EVENT_ACTION_DELETE")}</Button>
                    <Button type={ButtonType.Button} danger={false}>{tEvents("EVENT_ACTION_PREVIEW")}</Button>
                    <Button type={ButtonType.Button} danger={false} onClick={onCancel} disabled={eventInfoStates.length  > 1}>{tEvents("EVENT_ACTION_CANCEL")}</Button>
                    <Button type={ButtonType.Button} onClick={() => {
                        formSubmit();
                    }} danger={false}>{tEvents("EVENT_ACTION_SAVE")}</Button>
                </div>
            </div>
        </div>
    )
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ["header", "footer", "navigation", "events"]),
    },
});

export default EventInfo;