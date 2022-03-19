import "mocha";

import chai from "chai";
import chaiHttp from "chai-http";

import { NotFound, Unauthorized } from "./00_specials";
import { DeleteMe, GetMe, GetUser, GetUsers, PostUser, PutMe } from "./01_users";
import {
	AfterList,
	BeforeList,
	DeleteList,
	GetList,
	GetLists,
	InviteList,
	PostList,
	PutList,
	ShareList,
	UnshareList,
} from "./02_lists";
import {
	AfterGift,
	BeforeGift,
	BookGift,
	DeleteGift,
	FavGift,
	GetGift,
	GetGifts,
	HideGift,
	PostGift,
	PutGift,
	UnbookGift,
	UnfavGift,
	UnhideGift,
} from "./03_gifts";
import { CleanObject, Validators } from "./0_helpers";
import * as URLS from "./global/urls";

chai.use(chaiHttp);
describe("Helpers", function () {
	describe("Validators", Validators);
	describe("CleanObject", CleanObject);
});
describe("Specials", function () {
	describe("NotFound", NotFound);
	describe("Unauthorized", Unauthorized);
});
describe("Users", function () {
	describe("POST " + URLS.Url_UserPost(), PostUser);
	describe("GET " + URLS.Url_UserGetOne(), GetUser);
	describe("GET " + URLS.Url_UserGetAll(), GetUsers);
	describe("GET " + URLS.Url_UserGetMe(), GetMe);
	describe("PUT " + URLS.Url_UserPutMe(), PutMe);
});
describe("Lists", function () {
	before(async () => await BeforeList());
	describe("POST " + URLS.Url_ListPost(), PostList);
	describe("GET " + URLS.Url_ListGetOne(), GetList);
	describe("GET " + URLS.Url_ListGetAll(), GetLists);
	describe("PUT " + URLS.Url_ListPut(), PutList);
	describe("PUT " + URLS.Url_ListInvite(), InviteList);
	describe("PUT " + URLS.Url_ListShare(), ShareList);
	describe("PUT " + URLS.Url_ListUnshare(), UnshareList);
	after(async () => await AfterList());
});
describe("Gifts", function () {
	before(async () => await BeforeGift());
	describe("POST " + URLS.Url_GiftPost(), PostGift);
	describe("GET " + URLS.Url_GiftGetAll(), GetGifts);
	describe("GET " + URLS.Url_GiftGetOne(), GetGift);
	describe("PUT " + URLS.Url_GiftPut(), PutGift);
	describe("PUT " + URLS.Url_GiftBook(), BookGift);
	describe("PUT " + URLS.Url_GiftUnbook(), UnbookGift);
	describe("PUT " + URLS.Url_GiftFav(), FavGift);
	describe("PUT " + URLS.Url_GiftUnfav(), UnfavGift);
	describe("PUT " + URLS.Url_GiftHide(), HideGift);
	describe("PUT " + URLS.Url_GiftUnhide(), UnhideGift);
	after(async () => await AfterGift());
});
describe("DELETE " + URLS.Url_GiftDelete(), DeleteGift);
describe("DELETE " + URLS.Url_ListDelete(), DeleteList);
describe("DELETE " + URLS.Url_UserDeleteMe(), DeleteMe);
