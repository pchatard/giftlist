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
	value: Record<string, unknown> | Record<string, unknown>[];
	options?: Record<string, unknown>[];
	writable?: boolean;
}

export interface InputNumberData extends GeneralInputData {
	value: number;
	min?: number;
	max?: number;
	copy?: boolean;
	mandatory?: boolean;
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
	mandatory?: boolean;
}
