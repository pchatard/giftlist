import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import request from "request";
import server from "../src/index";
import GlobalVars from "./globalVars";

chai.use(chaiHttp);

const options = {
	url: process.env.AUTH0_TOKEN_URL as string,
	headers: { "content-type": "application/json" },
	body: JSON.stringify({
		client_id: process.env.AUTH0_CLIENT_ID,
		client_secret: process.env.AUTH0_CLIENT_SECRET,
		audience: process.env.AUTH0_AUDIENCE,
		grant_type: "client_credentials",
	}),
};

describe("Lists", () => {
	const baseUrl = "/lists";
	var token: string = "";

	before((done) => {
		request.post(options, function (error, _response, body) {
			if (error) throw new Error(error);
			token = JSON.parse(body)["access_token"];
			done();
		});

		GlobalVars.List1 = { title: "TestList1", ownersIds: [GlobalVars.User1_Id], isShared: false };
		GlobalVars.List2 = { title: "TestList2", ownersIds: [GlobalVars.User1_Id], isShared: true };
	});

	describe("POST /", () => {
		it("Recreate Users for further test (TODO: Remove)", async () => {
			const responses = [
				await chai
					.request(server)
					.post("/users")
					.send(GlobalVars.User1)
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.post("/users")
					.send(GlobalVars.User2)
					.set({ Authorization: `Bearer ${token}` }),
			];
			responses.forEach((response, index) => {
				expect(response).to.have.property("error").to.eql(false);
				expect(response).to.have.status(200);
				expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
				if (index == 0) GlobalVars.User1_Id = response.body.id;
				if (index == 1) GlobalVars.User2_Id = response.body.id;
			});
		});
		it("Returns 200 with ID if all data are provided", async () => {
			const responses = [
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send(GlobalVars.List1)
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send(GlobalVars.List2)
					.set({ Authorization: `Bearer ${token}` })
			];
			responses.forEach((response) => {
				expect(response).to.have.property("error").to.eql(false);
				expect(response).to.have.status(200);
				expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
			});
		});
		it("Returns 422, with validation error, if one of fields is empty", async () => {
			const responses = [
				// await chai
				// 	.request(server)
				// 	.post(baseUrl + "/")
				// 	.send({ title: "TestList2", ownersIds: [GlobalVars.User1_Id]})
				// 	.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send({ title: "TestList2" })
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send({ ownersIds: [GlobalVars.User1_Id] })
					.set({ Authorization: `Bearer ${token}` }),
			];
			responses.forEach((response) => {
				expect(response).to.have.property("error").to.not.eql(false);
				expect(response).to.have.status(422);
				expect(response)
					.to.have.property("body")
					.to.have.property("message")
					.to.be.eql("Validation Failed");
				expect(response).to.have.property("body").to.have.property("details").to.be.not.null;
			});
		});
    // EDIT A LIST NOT OWNED NOT SHARED -> Fail
    // EDIT A LIST NOT OWNED BUT SHARED -> Fail
    // EDIT A LIST MULTIPLE OWNED -> Success
    // EDIT A LIST SINGLE OWNED -> Success
    // GET A LIST NOT OWNED NOT SHARED -> Fail
    // GET A LIST NOT OWNED BUT SHARED -> Success
    // GET A LIST MULTIPLE OWNED -> Success
    // GET A LIST SINGLE OWNED -> Success
    // GET ALL LISTS -> Success
    // SHARE A UNSHARED LIST OWNED -> Success
    // SHARE A UNSHARED LIST NOT OWNED -> Fail
    // SHARE A SHARED LIST OWNED -> Success
    // SHARE A SHARED LIST NOT OWNED -> Fail
    // UNSHARE A UNSHARED LIST OWNED -> Success
    // UNSHARE A UNSHARED LIST NOT OWNED -> Fail
    // UNSHARE A SHARED LIST OWNED -> Success
    // UNSHARE A SHARED LIST NOT OWNED -> Fail
    // ADD A UNKNOWN LIST FROM SHARING CODE -> Success
    // ADD A ALREADY ADDED LIST FROM SHARING CODE -> Success
    // DELETE A LIST NOT OWNED NOT SHARED -> Fail
    // DELETE A LIST NOT OWNED BUT SHARED -> Success Forget
    // DELETE A LIST MULTIPLE OWNED -> Success Forget
    // DELETE A LIST SINGLE OWNED -> Success Delete
		it("Delete Users again (TODO: Remove)", async () => {
			const response = await chai
				.request(server)
				.delete("/users/" + GlobalVars.User1_Id)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(204);
			let list = await chai
				.request(server)
				.get("/users/")
				.set({ Authorization: `Bearer ${token}` });
			expect(list).to.have.property("body").to.eql([GlobalVars.User2]);
			await chai
				.request(server)
				.delete("/users/" + GlobalVars.User2_Id)
				.set({ Authorization: `Bearer ${token}` });
			list = await chai
				.request(server)
				.get("/users/")
				.set({ Authorization: `Bearer ${token}` });
			expect(list).to.have.property("body").to.eql([]);
		});
	});
});
