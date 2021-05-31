import { useMemo } from "react";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
    ACTION_TYPE_EVENT_ADD_INFO_STATE,
    ACTION_TYPE_EVENT_SET_ID,
    ACTION_TYPE_EVENT_SET_LIST,
    ACTION_TYPE_CITY_SET_LIST,
    ACTION_TYPE_CLUB_SET_LIST,
    ACTION_TYPE_COUNTRY_SET_LIST,
    ACTION_TYPE_EVENT_UNDO_INFO, ACTION_TYPE_SET_ICONS_TOGGLED
} from "~/redux/types";
import { EventInfoValues } from "~/pages/events/create";
import { City } from "@prisma/client";
import { Country } from "@prisma/client";
import { Club } from "@prisma/client";

let store;

export type State = {
    eventId: number | null;
    eventList: Event[];
    eventInfoStates: EventInfoValues[];
    toggleIcons: boolean;
    cityList: City[];
    countryList: Country[];
    clubList: Club[];
};

const initialState: State = {
    eventId: null,
    eventList: [],
    eventInfoStates: [],
    toggleIcons: false,
    cityList: [],
    countryList: [],
    clubList: []
};

const reducer = (state: State = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE_EVENT_SET_ID: {
            const newState = { ...state };
            const { id } = action;

            newState.eventId = id;
            return newState;
        }
        case ACTION_TYPE_EVENT_ADD_INFO_STATE: {
            const newState = { ...state };
            const { info } = action;

            newState.eventInfoStates.push(info);
            return newState;
        }
        case ACTION_TYPE_EVENT_UNDO_INFO: {
            const newState = { ...state };

            newState.eventInfoStates.pop();
            return newState;
        }
        case ACTION_TYPE_EVENT_SET_LIST: {
            const newState = { ...state };
            const { payload } = action;

            if ( payload ) {
                newState.eventList = payload;
                return newState;
            }
            return state;
        }
        case ACTION_TYPE_CITY_SET_LIST: {
            const newState = { ...state };
            const { payload } = action;

            if ( payload ) {
                newState.cityList = payload;
                return newState;
            }
            return state;
        }
        case ACTION_TYPE_COUNTRY_SET_LIST: {
            const newState = { ...state };
            const { payload } = action;

            if ( payload ) {
                newState.countryList = payload;
                return newState;
            }
            return state;
        }
        case ACTION_TYPE_CLUB_SET_LIST: {
            const newState = { ...state };
            const { payload } = action;

            if ( payload ) {
                newState.clubList = payload;
                return newState;
            }
            return state;
        }
        case ACTION_TYPE_SET_ICONS_TOGGLED: {
            const newState = {...state};
            const { isToggled } = action;

            if ( newState.toggleIcons !== isToggled ) {
                newState.toggleIcons = isToggled;
                return newState;
            }
            return state;
        }
        default:
            return state;
    }
};

function initStore(preloadedState: State = initialState) {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(thunk))
    )
}

export const initializeStore = (preloadedState: State) => {
    let _store = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export const useStore = (initialState) => {
    return useMemo(() => initializeStore(initialState), [initialState]);
};
