import { CreateGiftDTO } from "@/types/dto/CreateGiftDTO";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { GiftIdDTO } from "@/types/dto/GiftIdDTO";

export default class Gifts {
	API_PATH_CREATE = (listId: string) => `/lists/${listId}/gifts`;
	API_PATH_GET_ALL = (listId: string) => `/lists/${listId}/gifts`;
	API_PATH_GET_ONE = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}`;
	API_PATH_DELETE = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}`;
	API_PATH_EDIT = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}`;
	API_PATH_HIDE = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/hide`;
	API_PATH_UNHIDE = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/unhide`;
	API_PATH_FAV = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/fav`;
	API_PATH_UNFAV = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/unfav`;
	API_PATH_BOOK = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/book`;
	API_PATH_UNBOOK = (listId: string, giftId: string) => `/lists/${listId}/gifts/${giftId}/unbook`;

	// Create a gift
	static create(listId: string, gift: CreateGiftDTO): GiftIdDTO {
		console.log(listId, gift);
		return {};
	}

	// Get one list's gifts
	static getAll(listId: string): GiftDTO[] {
		console.log(listId);
		return [];
	}

	// Get a gift by its ID
	static getOne(listId: string, giftId: string): GiftDTO {
		console.log(listId, giftId);
		return {};
	}

	// Delete a gift
	static delete(listId: string, giftId: string) {
		console.log(listId, giftId);
	}

	// Edit a gift
	static edit(listId: string, giftId: string, gift: GiftDTO): GiftDTO {
		console.log(listId, giftId, gift);
		return {};
	}

	// Hide a gift
	static hide(listId: string, giftId: string) {
		console.log(listId, giftId);
	}

	// Unhide a gift
	static unhide(listId: string, giftId: string) {
		console.log(listId, giftId);
	}

	// Fav a gift
	static fav(listId: string, giftId: string) {
		console.log(listId, giftId);
	}

	// Unfav a gift
	static unfav(listId: string, giftId: string) {
		console.log(listId, giftId);
	}

	// Book a gift
	static book(listId: string, giftId: string) {
		console.log(listId, giftId);
	}

	// Unbook a gift
	static unbook(listId: string, giftId: string) {
		console.log(listId, giftId);
	}
}
