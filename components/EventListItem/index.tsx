import React, { FC, memo, useState } from "react";
import Check from "~/public/icons/check.svg"
import CheckNone from "~/public/icons/check-none.svg"
import Actions from "~/public/icons/actions.svg"
import styles from "./EventListItem.module.css";
import Switch from "../Switch";
import Eye from "~/public/icons/eye.svg";
import Edit from "~/public/icons/edit.svg";
import Copy from "~/public/icons/files.svg";
import Delete from "~/public/icons/delete.svg";
import Publish from "~/public/icons/plane.svg";
import cls from "~/utils/classname";
import IconButton, { IconButtonType } from "../IconButton";
import PopUp from "~/components/PopUp";
import PopUpPreview from "~/components/PopUpPreview";
import PopUpDetail from "~/components/PopUpDetail";
import { SERVER_ADDRESS } from "~/config";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { FetchEventList } from "~/redux/actions";

interface EventListItemProps {
    id: number;
    name: string;
    place: string;
    time: EventTime;
    image: string;
    publication: boolean;
    onCheck: (id: number, isChecked: boolean) => void;
    data: any;
    isOpenedPopup: boolean;
    changeOpenPopupStatus: (status: boolean) => void;
}

type EventTime = {
    from: Date;
    to: Date;
};

/**
 * Компонент эвента
 * @param props
 */
const EventListItem: FC<EventListItemProps> = (props:EventListItemProps) => {
    const { name, place, time, image, onCheck, id, data, publication, isOpenedPopup, changeOpenPopupStatus } = props;
    const [isChecked, setChecked] = useState<boolean>(false);
    const [isOpenedPopupDetail, setOpenedPopupDetail] = useState<boolean>(false);
    const [toggleActionMenu, setToggleActionMenu] = useState<boolean>(false);
    const [toggleActionPreview, setToggleActionPreview] = useState<boolean>(false);
    const [toggleNamePopUp, setToggleNamePopUp] = useState<boolean>(false);
    const [togglePlacePopUp, setTogglePlacePopUp] = useState<boolean>(false);
    const [toggleDatePopUp, setToggleDatePopUp] = useState<boolean>(false);

    const openPopupDetail = () => {
        setOpenedPopupDetail(true);
    }

    const closePopupDetail = () => {
        setOpenedPopupDetail(false);
    }

    const dispatch = useDispatch();

    const { t } = useTranslation("events");

    const onCheckClick = () => {
        onCheck(id, !isChecked);
        setChecked(!isChecked);
    };

    const deleteEvent = () => {
        fetch(`${SERVER_ADDRESS}/api/events/${id}`,
            { method: "DELETE" }).then(() => {
                dispatch(FetchEventList(()=>{}));
        });
    };

    const publishEvent = () => {
        if (publication) fetch(`${SERVER_ADDRESS}/api/events/${id}/off`,
            { method: "PUT" }).then(() => {
                dispatch(FetchEventList(()=>{}));
        });
        else fetch(`${SERVER_ADDRESS}/api/events/${id}/publication`,
            { method: "PUT" }).then(() => {
                dispatch(FetchEventList(()=>{}));
        });
    };

    const copyEvent = () => {
        const event = data;
        delete event.id;
        if (event.menuId) delete event.menuId;
        if (event.contentId) delete event.contentId;
        if (event.userId) delete event.userId;

        fetch(`${SERVER_ADDRESS}/api/events`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(event),
            }).then(() => {
            dispatch(FetchEventList(()=>{}));
        });
    };

    const doToggleActionMenu = (e) => {
        if (!isOpenedPopup) {
            e.stopPropagation();
            setToggleActionMenu(prev => !prev);
            changeOpenPopupStatus(true);
            setTimeout(() => window.addEventListener("click", (event) => {
                setToggleActionMenu(false);
                changeOpenPopupStatus(false);
            }), 10);   
        }
    }

    const doToggleActionPreview = (e) => {
        if (!isOpenedPopup) {
            e.stopPropagation();
            setToggleActionPreview(prev => !prev);
            changeOpenPopupStatus(true);
            setTimeout(() => window.addEventListener("click", (event) => {
                setToggleActionPreview(false);
                changeOpenPopupStatus(false);
            }), 10);
        }
    }

    const getMonthText = (month) => {
        switch(month) {
            case 0:
                return 'January';
            case 1:
                return 'Febrary';
            case 2:
                return 'March';
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
            default:
                return 'January';
        }
    }

    const getDateFormat = (date) => {
        if (date == 1) return '1st';
        else if (date == 2) return '2nd';
        else if (date == 3) return '3rd';
        else return date + 'th';
    }

    return (
        <div className={styles.mainContainer}>
            <PopUpDetail isOpenedPopupDetail={isOpenedPopupDetail} closePopupDetail={closePopupDetail} />
            <div className={cls([styles.field, styles.fieldCheck])} onClick={onCheckClick}>
                {
                    isChecked ?
                        <Check />
                        :
                        <CheckNone />
                }
            </div>
            <div className={cls([styles.field, styles.fieldName])}
                 onMouseEnter={()=>setToggleNamePopUp(prev => !prev)}
                 onMouseLeave={()=>setToggleNamePopUp(prev => !prev)}>
                <span>{name}</span>
                <PopUp active={toggleNamePopUp}>
                    <span>{name}</span>
                </PopUp>
            </div>
            <div className={styles.field}
                 onMouseEnter={()=>setTogglePlacePopUp(prev => !prev)}
                 onMouseLeave={()=>setTogglePlacePopUp(prev => !prev)}>
                <span>{place}</span>
                <PopUp active={togglePlacePopUp}>
                    <span>{place}</span>
                </PopUp>
            </div>
            <div className={styles.field}
                 onMouseEnter={()=>setToggleDatePopUp(prev => !prev)}
                 onMouseLeave={()=>setToggleDatePopUp(prev => !prev)}>
                <span>From {getDateFormat(new Date(data.workingTimeFrom).getDate())} {getMonthText(new Date(data.workingTimeFrom).getMonth()).substring(0, 3)} to {getDateFormat(new Date(data.workingTimeTo).getDate())} {getMonthText(new Date(data.workingTimeTo).getMonth()).substring(0, 3)}</span>
                <PopUp active={toggleDatePopUp}>
                    <span>From {getDateFormat(new Date(data.workingTimeFrom).getDate())} {getMonthText(new Date(data.workingTimeFrom).getMonth()).substring(0, 3)} to {getDateFormat(new Date(data.workingTimeTo).getDate())} {getMonthText(new Date(data.workingTimeTo).getMonth()).substring(0, 3)}</span>
                </PopUp>
            </div>
            <div className={styles.field} style={{width: 64}} onClick={doToggleActionPreview}>
                <img className={styles.preview} src={image} />
            </div>
            <PopUpPreview active={toggleActionPreview}>
                <div className={styles.actionPopUpPreview + ' popupwrap'}>
                    <img className={styles.popuppreview + ' popupwrap'} src={image} />
                    <div className={styles.previewinfo + ' popupwrap'}>
                        <div className={styles.eventName + ' popupwrap'}>{name}</div>
                        <div className={styles.eventAuth + ' popupwrap'}>{data.author}</div>
                        <div className={styles.eventDateWrap + ' popupwrap'}>
                            <img src="/icons/calendar.png" className="popupwrap" alt="" />
                            <div className={styles.eventDate + ' popupwrap'}>{new Date(data.dateCreate).getDate()} {getMonthText(new Date(data.dateCreate).getMonth())}</div>
                        </div>
                        <div className={styles.eventLocationWrap + ' popupwrap'}>
                            <div className={styles.eventAddressLabel + ' popupwrap'}>Location:</div>
                            <div className={styles.eventLocation + ' popupwrap'}>{data.address}</div>
                        </div>
                        <div className={styles.eventTicketWrap + ' popupwrap'}>
                            <div className={styles.eventTicketLabel + ' popupwrap'}>Ticket</div>
                            <div className={styles.eventTicket + ' popupwrap'}><span className={styles.eventTicketValue + ' popupwrap'}>{data.ticketprice + ' popupwrap'}</span> $</div>
                        </div>
                        <div className={styles.eventWorkingTimeWrap + ' popupwrap'}>
                            <div className={styles.eventWorkingTimeStartWrap + ' popupwrap'}>
                                <img src="/icons/startclock.png" className="popupwrap" alt="" />
                                <div className={styles.eventWorkingTimeStart + ' popupwrap'}>Start time:&nbsp;&nbsp;&nbsp;<span className={styles.eventWorkingTimeStartValue + ' popupwrap'}>{new Date(data.workingTimeFrom + ' popupwrap').getHours()}:{new Date(data.workingTimeFrom + ' popupwrap').getMinutes()}</span></div>
                            </div>
                            <div className={styles.eventWorkingTimeEndWrap + ' popupwrap'}>
                                <img src="/icons/endclock.png" className="popupwrap" alt="" />
                                <div className={styles.eventWorkingTimeEnd + ' popupwrap'}>Start time:&nbsp;&nbsp;&nbsp;<span className={styles.eventWorkingTimeEndValue + ' popupwrap'}>{new Date(data.workingTimeTo + ' popupwrap').getHours()}:{new Date(data.workingTimeTo + ' popupwrap').getMinutes()}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </PopUpPreview>
            <div className={styles.field} style={{width: 64}}>{
                publication ?
                    <Check />
                :
                    <></>
            }</div>
            <div className={styles.field}>
                <Switch state={publication} onClick={publishEvent} />
                <IconButton Icon={Actions} type={IconButtonType.Button} onClick={doToggleActionMenu} />
                <PopUp active={toggleActionMenu}>
                    <div className={styles.actionPopUp + ' menuwrap'}>
                        <IconButton Icon={Eye} label={t("EVENT_ACTION_SHOW_PAGE")} onClick={openPopupDetail} type={IconButtonType.Button} />
                        <IconButton Icon={Edit} label={t("EVENT_ACTION_EDIT")} type={IconButtonType.Link} href="/events/create" />
                        <IconButton Icon={Copy} label={t("EVENT_ACTION_COPY")} onClick={copyEvent} type={IconButtonType.Button} />
                        <IconButton Icon={Delete} label={t("EVENT_ACTION_DELETE")} onClick={deleteEvent} type={IconButtonType.Button} />
                        <IconButton Icon={Publish} label={publication ? t("EVENT_ACTION_OFF") : t("EVENT_ACTION_PUBLISH")} onClick={publishEvent} type={IconButtonType.Button} href="/" />
                    </div>
                </PopUp>
            </div>
        </div>
    );
};

export default memo(EventListItem);