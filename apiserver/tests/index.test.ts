import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { BaseUrl_Users, Url_UserGet } from "./global/constants";
import { NotFound, Unauthorized } from "./00_specials";
import { DeleteUser, GetUser, GetUsers, PostUser, PutUser } from "./01_users";

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
