import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { BaseUrl_Lists, BaseUrl_Users, Url_ListGet, Url_UserGet } from "./global/constants";
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
	describe("POST " + BaseUrl_Users, PostUser);
	describe("GET " + BaseUrl_Users, GetUsers);
	describe("GET " + Url_UserGet, GetUser);
	describe("PUT " + Url_UserGet, PutUser);
	describe("DELETE " + Url_UserGet, DeleteUser);
});
describe("Lists", function () {
	before(async () => await BeforeList());
	describe("POST " + BaseUrl_Lists, PostList);
	describe("GET " + BaseUrl_Lists, GetLists);
	describe("GET " + Url_ListGet, GetList);
	describe("PUT " + Url_ListGet, PutList);
	describe("DELETE " + Url_ListGet, DeleteList);
	after(async () => await AfterList());
});
