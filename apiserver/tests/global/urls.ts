// Users Endpoints
const BaseUrl_Users: string = "/users";

export const Url_UserPost = (): string => BaseUrl_Users;

export const Url_UserGetAll = (): string => BaseUrl_Users;

export const Url_UserGetOne = (userId: string = ":userId"): string => BaseUrl_Users + "/" + userId;

export const Url_UserPut = (userId: string = ":userId"): string => BaseUrl_Users + "/" + userId;

export const Url_UserDelete = (userId: string = ":userId"): string => BaseUrl_Users + "/" + userId;

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

// Specials Endpoints
export const Url_NotFound = (): string => "/notfound";

export const Url_Unauthorized = (): string => BaseUrl_Users;
