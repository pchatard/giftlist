import Gift from "@/types/Gift";
import { Module } from "vuex";
import { RootState } from ".";

export const gift: Module<GiftState, RootState> = {
	state: () => ({
		gifts: [],
	}),
	getters: {},
	mutations: {
		POPULATE_GIFTS: (state, gifts: Gift[]) => {
			state.gifts = gifts;
		},
		ADD_GIFT: (state, gift: Gift) => {
			state.gifts.push(gift);
		},
		MARK_GIFT_FAVORITE: (state, payload: { giftId: string; newState: boolean }) => {
			const { giftId, newState } = payload;
			const giftIndex = state.gifts.findIndex((gift) => gift.id === giftId);
			if (giftIndex >= 0) {
				state.gifts[giftIndex].favorite = newState;
			}
		},
		UPDATE_GIFT: (state, updatedGift: Gift) => {
			const giftIndex = state.gifts.findIndex((gift) => gift.id === updatedGift.id);
			if (giftIndex >= 0) {
				state.gifts.splice(giftIndex, 1, updatedGift);
			}
		},
		DELETE_GIFT: (state, giftId: string) => {
			const giftIndex = state.gifts.findIndex((gift) => gift.id === giftId);
			if (giftIndex >= 0) {
				state.gifts.splice(giftIndex, 1);
			}
		},
	},
	actions: {
		async initializeGifts({ commit, state }, listId) {
			// const gifts = await this.$axios.$get(`/api/gifts/${listId}`, {
			//     withCredentials: true,
			// });
			const gifts: Gift[] = [];
			for (let i = 0; i < 12; i++) {
				const gift = {
					id: `${i}`,
					favorite: i < 4,
				};
				gifts.push(gift);
			}
			commit("POPULATE_GIFTS", gifts);
			return state.gifts;
		},
		// async addGiftToList({ commit }, gift) {
		//     const newGift = await this.$axios.$post(
		//         `/api/gifts/${gift.listId}`,
		//         {
		//             gift,
		//         },
		//         { withCredentials: true }
		//     );
		//     commit('ADD_GIFT', newGift);
		// },
		async favoritizeGift(/*{ commit }, { giftId, listId, newState }*/) {
			console.debug("gift.ts - favoritizeGift");
			// const newFavoriteState = await this.$axios.$put(
			//     `/api/gifts/${listId}/${giftId}/fav`,
			//     { newState },
			//     { withCredentials: true }
			// );
			// commit('MARK_GIFT_FAVORITE', { giftId, newState: newFavoriteState });
		},
		async bookGift(/*{ commit }, { listId, giftId, status, name }*/) {
			console.debug("gift.ts - bookGift");
			// const updatedGift = await this.$axios.$put(
			//     `/api/gifts/${listId}/${giftId}/book`,
			//     { booked: status, name },
			//     { withCredentials: true }
			// );
			// commit('UPDATE_GIFT', updatedGift);
		},
		// async updateGift({ commit }, { id, ...gift }) {
		//     const updatedGift = await this.$axios.$put(
		//         `/api/gifts/${gift.listId}/${id}`,
		//         {
		//             ...gift,
		//         },
		//         { withCredentials: true }
		//     );
		//     commit('UPDATE_GIFT', updatedGift);
		// },
		async deleteGift(/*{ commit }, { giftId, listId }*/) {
			console.debug("gift.ts - deleteGift");
			// const success = await this.$axios.$delete(
			//     `/api/gifts/${listId}/${giftId}`,
			//     {
			//         withCredentials: true,
			//     }
			// );
			// if (success) {
			// commit('DELETE_GIFT', giftId);
			// }
		},
	},
};

export interface GiftState {
	gifts: Gift[];
}
