import {
    ACTION_TYPE_EVENT_ADD_INFO_STATE,
    ACTION_TYPE_EVENT_SET_ID,
    ACTION_TYPE_EVENT_SET_LIST,
    ACTION_TYPE_CITY_SET_LIST,
    ACTION_TYPE_COUNTRY_SET_LIST,
    ACTION_TYPE_CLUB_SET_LIST,
    ACTION_TYPE_EVENT_UNDO_INFO, ACTION_TYPE_SET_ICONS_TOGGLED
} from "~/redux/types";
import { EventInfoValues } from "~/pages/events/create";
import { SERVER_ADDRESS } from "~/config";
import { City } from "@prisma/client";
import { Country } from "@prisma/client";
import { Club } from "@prisma/client";

export const SetEventId = (id: number) => ({ type: ACTION_TYPE_EVENT_SET_ID, id });
export const AddEventInfo = (eventInfo: EventInfoValues) => ({ type: ACTION_TYPE_EVENT_ADD_INFO_STATE, info: eventInfo });
export const UndoEventInfo = () => ({ type: ACTION_TYPE_EVENT_UNDO_INFO });
export const SetEventList = (eventList: Event[]) => ({ type: ACTION_TYPE_EVENT_SET_LIST, payload: eventList });
export const SetCityList = (cityList: City[]) => ({ type: ACTION_TYPE_CITY_SET_LIST, payload: cityList });
export const SetCountryList = (countryList: Country[]) => ({ type: ACTION_TYPE_COUNTRY_SET_LIST, payload: countryList });
export const SetClubList = (clubList: Club[]) => ({ type: ACTION_TYPE_CLUB_SET_LIST, payload: clubList });

export const FetchEventList = (setLoading) => async (dispatch) => {
    setLoading(true);
    const resp = await fetch(`${SERVER_ADDRESS}/api/events`);
    const json = await resp.json();
    
    dispatch(SetEventList(json.data.items));
    setLoading(false);
};

export const FetchCityList = (setLoading) => async (dispatch) => {
    setLoading(true);
    const resp = await fetch(`${SERVER_ADDRESS}/api/cities`);
    const json = await resp.json();
    
    dispatch(SetCityList(json.data.items));
    setLoading(false);
};

export const FetchCountryList = (setLoading) => async (dispatch) => {
    setLoading(true);
    const resp = await fetch(`${SERVER_ADDRESS}/api/countries`);
    const json = await resp.json();
    
    dispatch(SetCountryList(json.data.items));
    setLoading(false);
};

export const FetchClubList = (setLoading) => async (dispatch) => {
    setLoading(true);
    const resp = await fetch(`${SERVER_ADDRESS}/api/clubs`);
    const json = await resp.json();
    
    dispatch(SetClubList(json.data.items));
    setLoading(false);
};

export const SetIconsToggled = (isToggled: boolean) => ({ type: ACTION_TYPE_SET_ICONS_TOGGLED, isToggled });