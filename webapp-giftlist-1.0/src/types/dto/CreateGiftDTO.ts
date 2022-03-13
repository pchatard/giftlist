export interface CreateGiftDTO {
	title: string;
	isFavorite: boolean;
	isHidden: boolean;
	category: string;
	price?: number;
	linkURL?: string;
	brand?: string;
	size?: string;
	color?: string;
	comments?: string;
}
