// Users Endpoints
const BaseUrl_Users: string = "/users";

export const Url_UserPost = (): string => BaseUrl_Users;

export const Url_UserGetAll = (): string => BaseUrl_Users;

export const Url_UserGetOne = (userId: string = ":userId"): string => BaseUrl_Users + "/" + userId;

export const Url_UserPut = (userId: string = ":userId"): string =>
	BaseUrl_Users + "/admin/" + userId;

export const Url_UserDelete = (userId: string = ":userId"): string =>
	BaseUrl_Users + "/admin/" + userId;

export const Url_UserGetMe = (): string => BaseUrl_Users + "/me";

export const Url_UserPutMe = (): string => BaseUrl_Users + "/me";

export const Url_UserDeleteMe = (): string => BaseUrl_Users + "/me";

// Lists Endpoints
const BaseUrl_Lists: string = "/lists";

export const Url_ListPost = (): string => BaseUrl_Lists;

export const Url_ListGetAll = (select: string = ":select"): string =>
	BaseUrl_Lists + "?select=" + select;

export const Url_ListGetOne = (listId: string = ":listId"): string => BaseUrl_Lists + "/" + listId;

export const Url_ListDelete = (listId: string = ":listId"): string => BaseUrl_Lists + "/" + listId;

export const Url_ListPut = (listId: string = ":listId"): string => BaseUrl_Lists + "/" + listId;

export const Url_ListShare = (listId: string = ":listId"): string =>
	BaseUrl_Lists + "/" + listId + "/share";

export const Url_ListUnshare = (listId: string = ":listId"): string =>
	BaseUrl_Lists + "/" + listId + "/unshare";

export const Url_ListInvite = (sharingCode: string = ":sharingCode"): string =>
	BaseUrl_Lists + "/invite/" + sharingCode;

// Lists Endpoints
const BaseUrl_Gift = (listId: string = ":listId"): string =>
	BaseUrl_Lists + "/" + listId + "/gifts";

export const Url_GiftPost = (listId: string = ":listId"): string => BaseUrl_Gift(listId);

export const Url_GiftGetAll = (listId: string = ":listId"): string => BaseUrl_Gift(listId);

export const Url_GiftGetOne = (listId: string = ":listId", giftId: string = ":giftId"): string =>
	BaseUrl_Gift(listId) + "/" + giftId;

export const Url_GiftDelete = (listId: string = ":listId", giftId: string = ":giftId"): string =>
	BaseUrl_Gift(listId) + "/" + giftId;

export const Url_GiftPut = (listId: string = ":listId", giftId: string = ":giftId"): string =>
	BaseUrl_Gift(listId) + "/" + giftId;

const Url_GiftSpecial = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	special: string
): string => BaseUrl_Gift(listId) + "/" + giftId + "/" + special;

export const Url_GiftHide = (listId: string = ":listId", giftId: string = ":giftId"): string =>
	Url_GiftSpecial(listId, giftId, "hide");

export const Url_GiftUnhide = (listId: string = ":listId", giftId: string = ":giftId"): string =>
	Url_GiftSpecial(listId, giftId, "unhide");

export const Url_GiftFav = (listId: string = ":listId", giftId: string = ":giftId"): string =>
	Url_GiftSpecial(listId, giftId, "fav");

export const Url_GiftUnfav = (listId: string = ":listId", giftId: string = ":giftId"): string =>
	Url_GiftSpecial(listId, giftId, "unfav");

export const Url_GiftBook = (listId: string = ":listId", giftId: string = ":giftId"): string =>
	Url_GiftSpecial(listId, giftId, "book");

export const Url_GiftUnbook = (listId: string = ":listId", giftId: string = ":giftId"): string =>
	Url_GiftSpecial(listId, giftId, "unbook");

// Specials Endpoints
export const Url_NotFound = (): string => "/notfound";

export const Url_GetUnauthorized = (): string => Url_UserGetAll();
export const Url_DeleteUnauthorized = (): string => Url_UserDeleteMe();
export const Url_PostUnauthorized = (): string => Url_ListPost();
export const Url_PutUnauthorized = (): string => Url_UserPutMe();
