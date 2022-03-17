import { Module } from "vuex";

import { RootState } from ".";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { CreateGiftPayload } from "@/types/payload/CreateGiftPayload";
import { EditGiftPayload } from "@/types/payload/EditGiftPayload";
import Gifts from "@/api/Gifts";

export const gifts: Module<GiftState, RootState> = {
	state: () => ({
		all: [],
		selected: initSelectedGift()
	}),
	getters: {
		getGiftIndex: (state) => (giftId: string) => {
			return state.all.findIndex((gift: GiftDTO) => gift.id === giftId);
		}
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
		EDIT_GIFT: (state, { giftIndex, editedGift }: { giftIndex: number, editedGift: GiftDTO }) => {
			state.all.splice(giftIndex, 1, editedGift);
		}
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
					commit('ADD_GIFT', newGift);
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
		editGift: async ({ commit }, { auth, listId, giftId, gift }: EditGiftPayload) => {
			console.log("editGift");
		},
		hideGift: async ({ commit }, { auth, listId, giftId }: GiftIdPayload) => {
			console.log("hideGift");
		},
		unhideGift: async ({ commit }, { auth, listId, giftId }: GiftIdPayload) => {
			console.log("unhideGift");
		},
		favGift: async ({ commit }, { auth, listId, giftId }: GiftIdPayload) => {
			console.log("favGift");
		},
		unfavGift: async ({ commit }, { auth, listId, giftId }: GiftIdPayload) => {
			console.log("unfavGift");
		},
		bookGift: async ({ commit }, { auth, listId, giftId }: GiftIdPayload) => {
			console.log("bookGift");
		},
		unbookGift: async ({ commit }, { auth, listId, giftId }: GiftIdPayload) => {
			console.log("unbookGift");
		}
	},
};

const initSelectedGift = (): GiftDTO => {
	const emptyGift: GiftDTO = {
		id: "",
		title: "",
		isFavorite: false,
		isHidden: false,
		category: "",
		listId: ""
	};
	return emptyGift;
}

export interface GiftState {
	all: GiftDTO[];
	selected: GiftDTO;
}
