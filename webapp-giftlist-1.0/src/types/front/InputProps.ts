export interface GeneralInputData {
	label: string;
	placeholder?: string;
	disabled?: boolean;
	isError?: boolean;
	errorMessage?: string;
	helperText?: string;
}

export interface InputToggleData extends GeneralInputData {
	value: boolean;
	inline?: boolean;
}

export interface InputTextData extends GeneralInputData {
	value: string;
	type?: "text" | "email" | "password";
	copy?: boolean;
	reset?: boolean;
	mandatory?: boolean;
	tab?: number;
}

export interface InputSelectData extends GeneralInputData {
	value: Record<string, unknown>[];
	options?: Record<string, unknown>[];
	writable?: boolean;
}

export interface InputNumberData extends GeneralInputData {
	value: number;
	min?: number;
	max?: number;
	copy?: boolean;
}

export interface InputDateData extends GeneralInputData {
	value: string;
}

export interface InputLinkData extends GeneralInputData {
	value: string;
	type?: "text" | "email" | "password";
	copy?: boolean;
	open?: boolean;
	reset?: boolean;
}

export interface ListFormStepOneData {
	title: InputTextData;
	description: InputTextData;
	activateTermDate: InputToggleData;
	termDate: InputDateData;
}

export interface ListFormStepTwoData {
	shared: InputToggleData;
	owners: InputSelectData;
	authorizedUsers: InputSelectData;
	// TODO: Change with FriendDTO later
	friends: Record<string, unknown>[];
}
