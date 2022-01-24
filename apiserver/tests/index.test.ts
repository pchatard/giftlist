import "mocha";
import { BaseUrl_Users, Url_UserGet } from "./global/constants";
import { NotFound, Unauthorized } from "./00_specials";
import { GetUsers, GetUser, PostUser, PutUser, DeleteUser } from "./01_users";

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
