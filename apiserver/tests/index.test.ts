import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import * as URLS from "./global/urls";
import { NotFound, Unauthorized } from "./00_specials";
import { DeleteUser, GetUser, GetUsers, PostUser, PutUser } from "./01_users";
import {
	AfterList,
	BeforeList,
	DeleteList,
	GetList,
	GetLists,
	PostList,
	PutList,
} from "./02_lists";

chai.use(chaiHttp);

describe("Specials", function () {
	describe("NotFound", NotFound);
	describe("Unauthorized", Unauthorized);
});
describe("Users", function () {
	describe("POST " + URLS.Url_UserPost(), PostUser);
	describe("GET " + URLS.Url_UserGetAll(), GetUsers);
	describe("GET " + URLS.Url_UserGetOne(), GetUser);
	describe("PUT " + URLS.Url_UserPut(), PutUser);
	describe("DELETE " + URLS.Url_UserDelete(), DeleteUser);
});
describe("Lists", function () {
	before(async () => await BeforeList());
	describe("POST " + URLS.Url_ListPost(), PostList);
	describe("GET " + URLS.Url_ListGetAll(), GetLists);
	describe("GET " + URLS.Url_ListGetOne(), GetList);
	describe("PUT " + URLS.Url_ListPut(), PutList);
	describe("DELETE " + URLS.Url_ListDelete(), DeleteList);
	after(async () => await AfterList());
});
