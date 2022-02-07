import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
// import { BaseUrl_Users, Url_UserGet } from "./global/constants";
import { NotFound, Unauthorized } from "./00_specials";

chai.use(chaiHttp);

describe("Specials", function () {
	describe("NotFound", NotFound);
	describe("Unauthorized", Unauthorized);
});
