import React, { useEffect, useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FetchEventList, SetIconsToggled } from "~/redux/actions";
import { SERVER_ADDRESS } from "~/config";

import ToggleIconInactive from "~/public/icons/ToggleIconInactive.svg";
import ToggleIcon from "~/public/icons/ToggleIcon.svg";
import EventsIcon from "~/public/icons/EventsIcon.svg";
import SettingsIcon from "~/public/icons/SettingsIcon.svg";
import SecurityIcon from "~/public/icons/SecurityIcon.svg";

import EventListItem from "~/components/EventListItem";
import Button, { ButtonType } from "~/components/Button";
import IconButton, { IconButtonType } from "~/components/IconButton";
import SideNavigation from "~/components/SideNavigation";
import NavigationItem from "~/components/SideNavigation/NavigationItem";
import ActivityIndicator from "~/components/ActitityIndicator";
import styles from "./Events.module.css";

const Events = () => {
    const { t: tNav } = useTranslation("navigation");
    const { t: tEvents } = useTranslation("events");
    const [loading, setLoading] = useState(false);
    const [isOpenedPopup, setOpenedPopup] = useState<boolean>(false);
    const [checkedEvents, setCheckedEvents] = useState([]);
    const state = useSelector(state=>state);
    const dispatch = useDispatch();

    const fetchEventList = () => {
        setCheckedEvents([]);
        dispatch(FetchEventList(setLoading));
    };
    useEffect(fetchEventList, []);

    const changeOpenPopupStatus = (status) => {
        setOpenedPopup(status);
    }

    const onCheck = (id, isChecked) => {
        if ( !isChecked ) {
            setCheckedEvents(list => list.filter((i) => id !== i));
        }
        else {
            setCheckedEvents(list => [...list, id]);
        }
    };

    const deleteEvents = () => {
        const promises = checkedEvents.map((id) => {
            return new Promise( (resolve) => {
                fetch(`${SERVER_ADDRESS}/api/events/${id}`,
                    { method: "DELETE" }).then(r=>r.json())
                    .then(res=>{
                        console.log(res);
                        resolve(res);
                    })
                    .catch(err=>{
                        console.log(err);
                        resolve(err);
                    });
            });
        });
        Promise.all(promises).then(() => {
            fetchEventList();
        });
    };

    const copyEvents = () => {
        const promises = checkedEvents.map((id) => {
            // @ts-ignore
            const event = state.eventList.filter(e => e.id === id)[0];
            delete event.id;
            if (event.menuId) delete event.menuId;
            if (event.contentId) delete event.contentId;
            if (event.userId) delete event.userId;

            return new Promise((resolve, reject) => {
                fetch(`${SERVER_ADDRESS}/api/events`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(event),
                    }).then(r=>r.json())
                    .then(res=>{
                        console.log(res);
                        resolve(res);
                    })
                    .catch(err=>{
                        console.log(err);
                        resolve(err);
                });
            });
        });

        Promise.all(promises).then(() => {
            fetchEventList();
        });
    };

    const toggleIcons = () => {
        // @ts-ignore
        dispatch(SetIconsToggled(!state.toggleIcons))
    }

    const publishEvent = () => {
        const promises = checkedEvents.map((id) => {
            return new Promise( (resolve) => {
                fetch(`${SERVER_ADDRESS}/api/events/${id}/publication`,
                    { method: "PUT" }).then(r=>r.json())
                    .then(res=>{
                        console.log(res);
                        resolve(res);
                    })
                    .catch(err=>{
                        console.log(err);
                        resolve(err);
                    });
            });
        });
        Promise.all(promises).then(() => {
            fetchEventList();
        });
    };

    const offEvent = () => {
        const promises = checkedEvents.map((id) => {
            return new Promise( (resolve) => {
                fetch(`${SERVER_ADDRESS}/api/events/${id}/off`,
                    { method: "PUT" }).then(r=>r.json())
                    .then(res=>{
                        console.log(res);
                        resolve(res);
                    })
                    .catch(err=>{
                        console.log(err);
                        resolve(err);
                    });
            });
        });
        Promise.all(promises).then(() => {
            fetchEventList();
        });
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <h1>{tEvents("EVENTS_TITLE")}</h1>
                <div className={styles.toggleIcon}>
                    {/*@ts-ignore*/}
                    <IconButton type={IconButtonType.Button} Icon={state.toggleIcons ? ToggleIcon : ToggleIconInactive} onClick={toggleIcons} />
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.navigation}>
                    <SideNavigation Icon={EventsIcon} title={tNav("EVENTS_TITLE")}>
                        <NavigationItem active={true} href="/events/" title={tNav("EVENTS_ALL")}>
                            <NavigationItem href="/events/create/" title={tNav("EVENTS_ADD")} />
                        </NavigationItem>
                        <NavigationItem href="/" title="Da Maria" />
                        <NavigationItem href="/" title="Da Romeo" />
                    </SideNavigation>
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
                    <SideNavigation Icon={SecurityIcon} title={tNav("SECURITY_TITLE")}>
                        <NavigationItem href="/security/password" title={tNav("SECURITY_PASSWORD_SETTINGS")}/>
                        <NavigationItem href="/security/accounts" title={tNav("SECURITY_ENTER_IN_ACCOUNTS")} />
                        <NavigationItem href="/security/tfa" title={tNav("SECURITY_TFA")} />
                        <NavigationItem href="/security/confidentiality" title={tNav("SECURITY_CONFIDENTIALITY")} />
                        <NavigationItem href="/security/delete-account" title={tNav("SECURITY_DELETE_ACCOUNT")} />
                    </SideNavigation>
                </div>
                <div className={styles.eventTable}>
                    <h2>{tEvents("EVENTS_ALL")}</h2>
                    <div className={styles.eventTableTitles}>
                        <div className={styles.checkField} />
                        <h3 className={styles.eventName}>{tEvents("EVENT_LIST_EVENT_NAME")}</h3>
                        <h3>{tEvents("EVENT_LIST_EVENT_PLACE")}</h3>
                        <h3>{tEvents("EVENT_LIST_EVENT_TIME")}</h3>
                        <h3 style={{width: 64}}>{tEvents("EVENT_LIST_EVENT_PREVIEW")}</h3>
                        <h3 style={{width: 64}}>{tEvents("EVENT_LIST_EVENT_PUBLISHED")}</h3>
                        <h3>{tEvents("EVENT_LIST_EVENT_ACTIONS")}</h3>
                    </div>
                    <div style={{height: "100%"}}>
                        {
                            loading ?
                                <div className={styles.eventTableContent}>
                                    <ActivityIndicator color="#A9A9B9" text="Loading" size={64} thickness={4} />
                                </div>
                            :
                            // @ts-ignore
                            !loading && !state.eventList?.length ?
                                <div className={styles.eventTableContent}>
                                    <span>Nothing here</span>
                                </div>
                            :
                                // @ts-ignore
                                state.eventList.map((event, i) => {
                                    return <EventListItem name={event.eventName}
                                                          image={event.image}
                                                          place={event.address}
                                                          publication={event.publication}
                                                          onCheck={onCheck}
                                                          time={{from: new Date(event.workingTimeFrom), to: new Date(event.workingTimeTo)}}
                                                          id={event.id}
                                                          data={event}
                                                          key={event.id}
                                                          isOpenedPopup={isOpenedPopup}
                                                          changeOpenPopupStatus={changeOpenPopupStatus}
                                    />
                                })
                        }
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <div className={styles.actionContainer}>
                    <Button type={ButtonType.Button} disabled={!checkedEvents.length} onClick={deleteEvents} danger={true}>{tEvents("EVENT_ACTION_DELETE")}</Button>
                    <Button type={ButtonType.Button} disabled={!checkedEvents.length} onClick={publishEvent} danger={false}>{tEvents("EVENT_ACTION_PUBLISH")}</Button>
                    <Button type={ButtonType.Button} disabled={!checkedEvents.length} onClick={copyEvents} danger={false}>{tEvents("EVENT_ACTION_COPY")}</Button>
                    <Button type={ButtonType.Button} danger={false}>{tEvents("EVENT_ACTION_PREVIEW")}</Button>
                    <Button type={ButtonType.Button} disabled={!checkedEvents.length} onClick={offEvent} danger={true}>{tEvents("EVENT_ACTION_OFF")}</Button>
                </div>
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
