import { Module } from "vuex";

import Gifts from "@/api/Gifts";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { CreateGiftPayload } from "@/types/payload/CreateGiftPayload";
import { EditGiftPayload } from "@/types/payload/EditGiftPayload";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { ListIdPayload } from "@/types/payload/ListIdPayload";

import { RootState } from "./";

const initSelectedGift = (): GiftDTO => {
	const emptyGift: GiftDTO = {
		id: "",
		title: "",
		isFavorite: false,
		isHidden: false,
		category: "",
		listId: "",
	};
	return emptyGift;
};

export interface GiftState {
	all: GiftDTO[];
	selected: GiftDTO;
}

export const gifts: Module<GiftState, RootState> = {
	state: () => ({
		all: [],
		selected: initSelectedGift(),
	}),
	getters: {
		getGiftIndex: (state) => (giftId: string) => {
			return state.all.findIndex((gift: GiftDTO) => gift.id === giftId);
		},
	},
	mutations: {
		FILL_GIFTS: (state, gifts: GiftDTO[]) => {
			state.all = gifts;
		},
		FILL_GIFT: (state, gift: GiftDTO) => {
			state.selected = gift;
		},
		EMPTY_GIFT: (state) => {
			state.selected = initSelectedGift();
		},
		ADD_GIFT: (state, gift: GiftDTO) => {
			state.all.push(gift);
		},
		DELETE_GIFT: (state, giftIndex: number) => {
			state.all.splice(giftIndex, 1);
		},
		EDIT_GIFT: (state, { giftIndex, editedGift }: { giftIndex: number; editedGift: GiftDTO }) => {
			state.all.splice(giftIndex, 1, editedGift);
		},
	},
	actions: {
		getGifts: async ({ commit }, { auth, listId }: ListIdPayload) => {
			const gifts = await Gifts.getAll(auth, listId);
			if (gifts) {
				commit("FILL_GIFTS", gifts);
				return true;
			}
		},
		getGift: async ({ commit }, { auth, listId, giftId }: GiftIdPayload) => {
			const gift = await Gifts.getOne(auth, listId, giftId);
			if (gift) {
				commit("FILL_GIFT", gift);
				return true;
			}
		},
		createGift: async ({ commit }, { auth, listId, gift }: CreateGiftPayload) => {
			const result = await Gifts.create(auth, listId, gift);
			if (result) {
				const newGift = await Gifts.getOne(auth, listId, result.id);
				if (newGift) {
					commit("ADD_GIFT", newGift);
					return true;
				}
			}
		},
		deleteGift: async ({ commit, getters }, { auth, listId, giftId }: GiftIdPayload) => {
			const success = await Gifts.delete(auth, listId, giftId);
			if (success) {
				const giftIndex = getters.getGiftIndex(giftId);
				if (giftIndex >= 0) {
					commit("DELETE_GIFT", giftIndex);
					return true;
				}
			}
		},
		editGift: async (
			{ commit, getters, state },
			{ auth, listId, giftId, partialGift }: EditGiftPayload
		) => {
			const success = await Gifts.edit(auth, listId, giftId, partialGift);
			if (success) {
				const giftIndex = getters.getGiftIndex(giftId);
				if (giftIndex >= 0) {
					const editedGift: GiftDTO = {
						...state.all[giftIndex],
						...partialGift,
					};
					commit("EDIT_GIFT", { giftIndex, editedGift });
					return true;
				}
			}
		},
		hideGift: async ({ commit, getters, state }, { auth, listId, giftId }: GiftIdPayload) => {
			const success = await Gifts.fav(auth, listId, giftId);
			if (success) {
				const giftIndex = getters.getGiftIndex(giftId);
				if (giftIndex >= 0) {
					const editedGift: GiftDTO = {
						...state.all[giftIndex],
						isHidden: true,
					};
					commit("EDIT_GIFT", { giftIndex, editedGift });
					return true;
				}
			}
		},
		unhideGift: async ({ commit, getters, state }, { auth, listId, giftId }: GiftIdPayload) => {
			const success = await Gifts.fav(auth, listId, giftId);
			if (success) {
				const giftIndex = getters.getGiftIndex(giftId);
				if (giftIndex >= 0) {
					const editedGift: GiftDTO = {
						...state.all[giftIndex],
						isHidden: false,
					};
					commit("EDIT_GIFT", { giftIndex, editedGift });
					return true;
				}
			}
		},
		favGift: async ({ commit, getters, state }, { auth, listId, giftId }: GiftIdPayload) => {
			const success = await Gifts.fav(auth, listId, giftId);
			if (success) {
				const giftIndex = getters.getGiftIndex(giftId);
				if (giftIndex >= 0) {
					const editedGift: GiftDTO = {
						...state.all[giftIndex],
						isFavorite: true,
					};
					commit("EDIT_GIFT", { giftIndex, editedGift });
					return true;
				}
			}
		},
		unfavGift: async ({ commit, state, getters }, { auth, listId, giftId }: GiftIdPayload) => {
			const success = await Gifts.unfav(auth, listId, giftId);
			if (success) {
				const giftIndex = getters.getGiftIndex(giftId);
				if (giftIndex >= 0) {
					const editedGift: GiftDTO = {
						...state.all[giftIndex],
						isFavorite: false,
					};
					commit("EDIT_GIFT", { giftIndex, editedGift });
					return true;
				}
			}
		},
		bookGift: async ({ commit, getters, state }, { auth, listId, giftId }: GiftIdPayload) => {
			const success = await Gifts.book(auth, listId, giftId);
			if (success) {
				const giftIndex = getters.getGiftIndex(giftId);
				if (giftIndex >= 0) {
					const editedGift: GiftDTO = {
						...state.all[giftIndex],
						isBooked: true,
					};
					commit("EDIT_GIFT", { giftIndex, editedGift });
					return true;
				}
			}
		},
		unbookGift: async ({ commit, getters, state }, { auth, listId, giftId }: GiftIdPayload) => {
			const success = await Gifts.unbook(auth, listId, giftId);
			if (success) {
				const giftIndex = getters.getGiftIndex(giftId);
				if (giftIndex >= 0) {
					const editedGift: GiftDTO = {
						...state.all[giftIndex],
						isBooked: false,
					};
					commit("EDIT_GIFT", { giftIndex, editedGift });
					return true;
				}
			}
		},
	},
};
