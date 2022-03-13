import { Module } from "vuex";

import { Gift } from "@/types/api/Gift";

import { RootState } from "./";

export const gift: Module<GiftState, RootState> = {
	state: () => ({
		gifts: []
	}),
	getters: {},
	mutations: {

	},
	actions: {

	},
};

export interface GiftState {
	gifts: Gift[];
}
