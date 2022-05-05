import {
	InputDateData,
	InputSelectData,
	InputTextData,
	InputToggleData,
} from "@/types/front/InputProps";
import { Module } from "vuex";
import { RootState } from ".";

import labels from "@/labels/fr/labels.json";
import { CreateListDTO } from "@/types/dto/CreateListDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { PartialListDTO } from "@/types/dto/PartialListDTO";

export interface ListFormState {
	currentStep: number;
	title: InputTextData;
	description: InputTextData;
	hasClosureDate: InputToggleData;
	closureDate: InputDateData;
	isShared: InputToggleData;
	owners: InputSelectData;
	grantedUsers: InputSelectData;
}

const getInitDate = (): Date => {
	const date = new Date();
	date.setDate(date.getDate() + 1);
	const offset = date.getTimezoneOffset();
	return new Date(date.getTime() - offset * 60 * 1000);
};

const formatInitDate = (): string => {
	return getInitDate().toISOString().split("T")[0];
};

const initListFormState = (): ListFormState => {
	return {
		currentStep: 1,
		title: {
			label: labels.newList.step1.inputs.title.label,
			value: "",
			errorMessage: "",
			helperText: labels.newList.step1.inputs.title.helperText,
			placeholder: labels.newList.step1.inputs.title.placeholder,
			mandatory: true,
		},
		description: {
			label: labels.newList.step1.inputs.description.label,
			value: "",
			placeholder: labels.newList.step1.inputs.description.placeholder,
			helperText: labels.newList.step1.inputs.description.helperText,
			errorMessage: "",
			mandatory: false,
		},
		hasClosureDate: {
			value: false,
			label: labels.newList.step1.inputs.activateTermDate.label,
			helperText: labels.newList.step1.inputs.activateTermDate.helperText,
		},
		closureDate: {
			label: labels.newList.step1.inputs.termDate.label,
			value: formatInitDate(),
			helperText: labels.newList.step1.inputs.termDate.helperText,
			errorMessage: "",
		},
		isShared: {
			value: false,
			label: labels.newList.step2.inputs.shared.label,
			helperText: labels.newList.step2.inputs.shared.helperText,
		},
		owners: {
			label: labels.newList.step2.inputs.owners.label,
			helperText: labels.newList.step2.inputs.owners.helperText,
			value: [],
		},
		grantedUsers: {
			label: labels.newList.step2.inputs.authorizedUsers.label,
			helperText: labels.newList.step2.inputs.authorizedUsers.helperText,
			value: [],
		},
	};
};

export const listForm: Module<ListFormState, RootState> = {
	state: initListFormState,
	getters: {
		getCurrentStep: (state: ListFormState): number => state.currentStep,
		getListTitle: (state: ListFormState): string => state.title.value,
		getListDescription: (state: ListFormState): string => state.description.value,
		listHasClosureDate: (state: ListFormState): boolean => state.hasClosureDate.value,
		getListClosureDate: (state: ListFormState): string => state.closureDate.value,
		listIsShared: (state: ListFormState): boolean => state.isShared.value,
		getListOwners: (state: ListFormState): Record<string, unknown>[] | Record<string, unknown> =>
			state.owners.value,
		getListGrantedUsers: (
			state: ListFormState
		): Record<string, unknown>[] | Record<string, unknown> => state.grantedUsers.value,
		getListData: (_state: ListFormState, getters): CreateListDTO => {
			const newList: CreateListDTO = {
				title: getters.getListTitle,
				description: getters.getListDescription || undefined,
				closureDate: getters.getListClosureDate || undefined,
				ownersIds: getters.getListOwners.map(
					(owner: Record<string, unknown>) => owner.id as string
				),
				isShared: getters.listIsShared,
				grantedUsersIds: getters.listIsShared
					? getters.getListGrantedUsers.map(
							(grantedUser: Record<string, unknown>) => grantedUser.id as string
					  )
					: undefined,
			};
			return newList;
		},
		getPartialListData:
			(_state: ListFormState, getters) =>
			(initialList: ListDTO): PartialListDTO => {
				const list: PartialListDTO = {};

				if (getters.getListTitle !== initialList.title) {
					list.title = getters.getListTitle;
				}

				if (getters.getListDescription !== initialList.description) {
					list.description = getters.getListDescription;
				}

				if (
					getters.listHasClosureDate &&
					getters.getListClosureDate !== initialList.closureDate
				) {
					list.closureDate = getters.getListClosureDate;
				}

				if (!getters.listHasClosureDate) {
					list.closureDate = null;
				}

				const isShared = getters.listIsShared;
				if (isShared && isShared != initialList.isShared) {
					list.isShared = isShared;
				}

				// TODO: Handle owners and grantedUsers

				return list;
			},
	},
	mutations: {
		INIT_LIST_CLOSURE_DATE: (state: ListFormState, initDate: string) => {
			state.closureDate.value = initDate;
		},
		SET_LIST_STATE: (state: ListFormState, initState: ListFormState) => {
			Object.assign(state, initState);
		},
		SET_LIST_CURRENT_STATE: (state: ListFormState, currentStep: number) => {
			state.currentStep = currentStep;
		},
		SET_LIST_TITLE: (state: ListFormState, title: string) => {
			state.title.value = title;
			state.title.errorMessage = "";
		},
		SET_LIST_DESCRIPTION: (state: ListFormState, description: string) => {
			state.description.value = description;
			state.description.errorMessage = "";
		},
		SET_LIST_HAS_CLOSURE_DATE: (state: ListFormState, hasClosureDate: boolean) => {
			state.hasClosureDate.value = hasClosureDate;
		},
		SET_LIST_CLOSURE_DATE: (state: ListFormState, closureDate: string) => {
			state.closureDate.value = closureDate;
			state.closureDate.errorMessage = "";
		},
		SET_LIST_IS_SHARED: (state: ListFormState, isShared: boolean) => {
			state.isShared.value = isShared;
		},
		SET_LIST_OWNERS: (state: ListFormState, owners: Record<string, unknown>[]) => {
			state.owners.value = owners;
		},
		SET_LIST_GRANTED_USERS: (state: ListFormState, grantedUsers: Record<string, unknown>[]) => {
			state.grantedUsers.value = grantedUsers;
		},
		SET_LIST_TITLE_ERROR_MESSAGE: (state: ListFormState, errorMessage: string) => {
			state.title.errorMessage = errorMessage;
		},
		SET_LIST_CLOSURE_DATE_ERROR_MESSAGE: (state: ListFormState, errorMessage: string) => {
			state.closureDate.errorMessage = errorMessage;
		},
	},
	actions: {
		initListFormState: ({ commit }) => {
			commit("SET_LIST_STATE", initListFormState());
		},
		initListData: ({ commit, dispatch }, initialList: ListDTO) => {
			commit("SET_LIST_TITLE", initialList.title);

			if (initialList.description) {
				commit("SET_LIST_DESCRIPTION", initialList.description);
			}

			if (initialList.closureDate) {
				commit("SET_LIST_HAS_CLOSURE_DATE", true);
				const formatedDate = new Date(initialList.closureDate).toISOString().split("T")[0];
				commit("SET_LIST_CLOSURE_DATE", formatedDate);
			} else {
				dispatch("initListClosureDate");
			}

			commit("SET_LIST_IS_SHARED", initialList.isShared);
			commit("SET_LIST_OWNERS", initialList.ownersDTO);
			commit("SET_LIST_GRANTED_USERS", initialList.grantedUsersDTO);
		},
		initListClosureDate: ({ commit }) => {
			commit("INIT_LIST_CLOSURE_DATE", formatInitDate());
		},
		changeListCurrentStep: ({ commit }, step) => {
			commit("SET_LIST_CURRENT_STATE", step);
		},
		changeListTitle: ({ commit }, title: string) => {
			commit("SET_LIST_TITLE", title);
		},
		changeListDescription: ({ commit }, description: string) => {
			commit("SET_LIST_DESCRIPTION", description);
		},
		changeListHasClosureDate: ({ commit, dispatch }, hasClosureDate: boolean) => {
			if (hasClosureDate) {
				dispatch("initListClosureDate");
			}
			commit("SET_LIST_HAS_CLOSURE_DATE", hasClosureDate);
		},
		changeListClosureDate: ({ commit }, closureDate: string) => {
			commit("SET_LIST_CLOSURE_DATE", closureDate);
		},
		changeListIsShared: ({ commit }, isShared: boolean) => {
			commit("SET_LIST_IS_SHARED", isShared);
		},
		selectListOwner: ({ commit, getters }, selectedOwner: Record<string, unknown>) => {
			const owners = [...getters.getListOwners];
			const grantedUsers = [...getters.getListGrantedUsers];
			owners.push(selectedOwner);
			const selectedOwnerIndex = grantedUsers.findIndex(
				(user: Record<string, unknown>) => user.id === selectedOwner.id
			);
			if (selectedOwnerIndex >= 0) {
				grantedUsers.splice(selectedOwnerIndex, 1);
			}
			commit("SET_LIST_OWNERS", owners);
			commit("SET_LIST_GRANTED_USERS", grantedUsers);
		},
		deleteListOwner: ({ commit, getters }, id: string) => {
			const owners = [...getters.getListOwners];
			owners.splice(
				owners.findIndex((owner) => owner.id === id),
				1
			);
			commit("SET_LIST_OWNERS", owners);
		},
		selectListGrantedUser: ({ commit, getters }, selectedUser: Record<string, unknown>) => {
			const grantedUsers = [...getters.getListGrantedUsers];
			grantedUsers.push(selectedUser);
			commit("SET_LIST_GRANTED_USERS", grantedUsers);
		},
		deleteListGrantedUser: ({ commit, getters }, id: string) => {
			const grantedUsers = [...getters.getListGrantedUsers];
			grantedUsers.splice(
				grantedUsers.findIndex((grantedUser) => grantedUser.id === id),
				1
			);
			commit("SET_LIST_GRANTED_USERS", grantedUsers);
		},
		checkListStepOneData: ({ state, commit }): boolean => {
			let validateStep = true;

			// Check that title is filled
			if (!state.title.value) {
				const titleErrorMessage = labels.newList.step1.inputs.title.errors.mandatory;
				commit("SET_LIST_TITLE_ERROR_MESSAGE", titleErrorMessage);
				validateStep = false;
			}

			// Check that title matches regex : Only alphanumeric values
			// Check title length
			// Check title only white space ?

			// Same thing for description

			// Check that date is not in the past
			if (state.hasClosureDate.value) {
				const dateIsInPast = new Date(state.closureDate.value) <= new Date();
				if (dateIsInPast) {
					const closureDateErrorMessage = labels.newList.step1.inputs.termDate.errors.pastDate;
					commit("SET_LIST_CLOSURE_DATE_ERROR_MESSAGE", closureDateErrorMessage);
					validateStep = false;
				}
			}
			return validateStep;
		},
		checkListStepTwoData: (): boolean => {
			const validateStep = true;
			return validateStep;
		},
	},
};
