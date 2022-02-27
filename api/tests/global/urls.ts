// Users Endpoints
const BaseUrl_Users: string = "/users";

export const Url_UserPost = (): string => BaseUrl_Users;

export const Url_UserGetAll = (): string => BaseUrl_Users;

export const Url_UserGetOne = (userId: string = ":userId"): string => BaseUrl_Users + "/" + userId;

export const Url_UserGetMe = (): string => BaseUrl_Users + "/me";

export const Url_UserPutMe = (): string => BaseUrl_Users + "/me";

export const Url_UserDeleteMe = (): string => BaseUrl_Users + "/me";

// Lists Endpoints
const BaseUrl_Lists: string = "/lists";

export const Url_ListPost = (): string => BaseUrl_Lists;

export const Url_ListGetAll = (userId: string = ":userId", select: string = ":select"): string =>
	BaseUrl_Lists + "?userId=" + userId + "&select=" + select;

export const Url_ListGetOne = (listId: string = ":listId", userId: string = ":userId"): string =>
	BaseUrl_Lists + "/" + listId + "?userId=" + userId;

export const Url_ListDelete = (listId: string = ":listId", userId: string = ":userId"): string =>
	BaseUrl_Lists + "/" + listId + "?userId=" + userId;

export const Url_ListPut = (listId: string = ":listId", userId: string = ":userId"): string =>
	BaseUrl_Lists + "/" + listId + "?userId=" + userId;

export const Url_ListShare = (listId: string = ":listId", userId: string = ":userId"): string =>
	BaseUrl_Lists + "/" + listId + "/share?userId=" + userId;

export const Url_ListUnshare = (listId: string = ":listId", userId: string = ":userId"): string =>
	BaseUrl_Lists + "/" + listId + "/unshare?userId=" + userId;

export const Url_ListInvite = (
	sharingCode: string = ":listId",
	userId: string = ":userId"
): string => BaseUrl_Lists + "/invite/" + sharingCode + "?userId=" + userId;

// Lists Endpoints
const BaseUrl_Gift = (listId: string = ":listId"): string =>
	BaseUrl_Lists + "/" + listId + "/gifts";

export const Url_GiftPost = (listId: string = ":listId", userId: string = ":userId"): string =>
	BaseUrl_Gift(listId) + "?userId=" + userId;

export const Url_GiftGetAll = (listId: string = ":listId", userId: string = ":userId"): string =>
	BaseUrl_Gift(listId) + "?userId=" + userId;

export const Url_GiftGetOne = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId"
): string => BaseUrl_Gift(listId) + "/" + giftId + "?userId=" + userId;

export const Url_GiftDelete = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId"
): string => BaseUrl_Gift(listId) + "/" + giftId + "?userId=" + userId;

export const Url_GiftPut = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId"
): string => BaseUrl_Gift(listId) + "/" + giftId + "?userId=" + userId;

const Url_GiftSpecial = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId",
	special: string
): string => BaseUrl_Gift(listId) + "/" + giftId + "/" + special + "?userId=" + userId;

export const Url_GiftHide = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId"
): string => Url_GiftSpecial(listId, giftId, userId, "hide");

export const Url_GiftUnhide = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId"
): string => Url_GiftSpecial(listId, giftId, userId, "unhide");

export const Url_GiftFav = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId"
): string => Url_GiftSpecial(listId, giftId, userId, "fav");

export const Url_GiftUnfav = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId"
): string => Url_GiftSpecial(listId, giftId, userId, "unfav");

export const Url_GiftBook = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId"
): string => Url_GiftSpecial(listId, giftId, userId, "book");

export const Url_GiftUnbook = (
	listId: string = ":listId",
	giftId: string = ":giftId",
	userId: string = ":userId"
): string => Url_GiftSpecial(listId, giftId, userId, "unbook");

// Specials Endpoints
export const Url_NotFound = (): string => "/notfound";

export const Url_GetUnauthorized = (): string => Url_UserGetAll();
export const Url_DeleteUnauthorized = (): string => Url_UserDeleteMe();
export const Url_PostUnauthorized = (): string => Url_UserPost();
export const Url_PutUnauthorized = (): string => Url_UserPutMe();
