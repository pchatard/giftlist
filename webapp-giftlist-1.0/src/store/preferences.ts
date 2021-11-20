import { Module } from "vuex";
import { RootState } from ".";

export const preferences: Module<PreferencesState, RootState> = {
    state: () => ({
        listDisplayModeIsGrid: false,
        bookingShowOthers: false,
    }),
    mutations: {
        SET_LIST_DISPLAY_MODE: (state, listDisplayModeIsGrid: boolean) => {
            state.listDisplayModeIsGrid = listDisplayModeIsGrid;
        },
        SET_BOOKING_SHOW_OTHERS: (state, bookingShowOthers: boolean) => {
            state.bookingShowOthers = bookingShowOthers;
        },
    },
    actions: {
        toggleListDisplayMode: (context) => {
            context.commit("SET_LIST_DISPLAY_MODE", !context.state.listDisplayModeIsGrid);
        },
        toggleBookingShowOthers: (context) => {
            context.commit("SET_BOOKING_SHOW_OTHERS", !context.state.bookingShowOthers);
        },
    },
};

export interface PreferencesState {
    listDisplayModeIsGrid: boolean;
    bookingShowOthers: boolean;
}
