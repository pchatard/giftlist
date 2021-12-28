import { Gift } from "@/types/api/Gift";
import { Module } from "vuex";
import { RootState } from ".";

export const gift: Module<GiftState, RootState> = {
    state: () => ({
        gifts: [],
    }),
    getters: {},
    mutations: {
        POPULATE_GIFTS: (state: GiftState, gifts: Gift[]) => {
            state.gifts = gifts;
        },
        ADD_GIFT: (state: GiftState, gift: Gift) => {
            state.gifts.push(gift);
        },
        MARK_GIFT_FAVORITE: (state: GiftState, payload: { giftId: string; newState: boolean }) => {
            const { giftId, newState } = payload;
            const giftIndex = state.gifts.findIndex((gift) => gift.id === giftId);
            if (giftIndex >= 0) {
                state.gifts[giftIndex].isFavorite = newState;
            }
        },
        UPDATE_GIFT: (state: GiftState, updatedGift: Gift) => {
            const giftIndex = state.gifts.findIndex((gift) => gift.id === updatedGift.id);
            if (giftIndex >= 0) {
                state.gifts.splice(giftIndex, 1, updatedGift);
            }
        },
        DELETE_GIFT: (state: GiftState, giftId: string) => {
            const giftIndex = state.gifts.findIndex((gift) => gift.id === giftId);
            if (giftIndex >= 0) {
                state.gifts.splice(giftIndex, 1);
            }
        },
    },
    actions: {
        async initializeGifts({ commit, state, rootState }, listCode) {
            const gifts: Gift[] = rootState.list.mine[0].gifts || [];
            commit("POPULATE_GIFTS", gifts);
            return state.gifts;
        },
        async favoritizeGift() {
            console.debug("gift.ts - favoritizeGift");
        },
        async bookGift() {
            console.debug("gift.ts - bookGift");
        },
        async deleteGift() {
            console.debug("gift.ts - deleteGift");
        },
    },
};

export interface GiftState {
    gifts: Gift[];
}
