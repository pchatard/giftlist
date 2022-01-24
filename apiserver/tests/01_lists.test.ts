import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import request from "request";
import server from "./../src/index";
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
		request.post(options, async function (error, _response, body) {
			if (error) throw new Error(error);
			token = JSON.parse(body)["access_token"];
			GlobalVars.List1 = {
				title: "TestList1",
				ownersIds: [],
				isShared: false,
			};
			GlobalVars.List2 = {
				title: "TestList2",
				ownersIds: [],
				grantedUsersIds: [],
				isShared: true,
			};

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
				if (index == 0) {
					GlobalVars.User1_Id = response.body.id;
					GlobalVars.List1.ownersIds.push(GlobalVars.User1_Id);
					GlobalVars.List2.ownersIds.push(GlobalVars.User1_Id);
				}
				if (index == 1) {
					GlobalVars.User2_Id = response.body.id;
					GlobalVars.List2.grantedUsersIds?.push(GlobalVars.User2_Id);
				}
			});
			done();
		});
	});

	describe("POST /", () => {
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
					.set({ Authorization: `Bearer ${token}` }),
			];
			responses.forEach((response, index) => {
				expect(response).to.have.property("error").to.eql(false);
				expect(response).to.have.status(200);
				expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
				if (index == 0) GlobalVars.List1_Id = response.body.id;
				if (index == 1) GlobalVars.List2_Id = response.body.id;
			});
		});
		it("Returns 422, with validation error, if one of fields is empty", async () => {
			const responses = [
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
	});
	// EDIT A LIST NOT OWNED NOT GRANTED -> Fail
	// EDIT A LIST NOT OWNED BUT GRANTED -> Fail
	// EDIT A LIST MULTIPLE OWNED -> Success
	// EDIT A LIST SINGLE OWNED -> Success
	describe("GET /:listId?userId", () => {
		it("Returns 401 Unauthorized, if not owned not granted", async () => {
			const response = await chai
				.request(server)
				.get(baseUrl + "/" + GlobalVars.List1_Id + "?userId=" + GlobalVars.User2_Id)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(401);
			expect(response)
				.to.have.property("body")
				.to.have.property("message")
				.to.be.eql("Unauthorized");
		});
		it("Returns 200 with list informations, if not owned but granted", async () => {
			const result: any = GlobalVars.List2;
			const response = await chai
				.request(server)
				.get(baseUrl + "/" + GlobalVars.List2_Id + "?userId=" + GlobalVars.User2_Id)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(200);
			expect(response).to.have.property("body").to.deep.include(result);
			expect(response).to.have.property("body").to.have.property("sharingCode").to.be.a.string;
			expect(response).to.have.property("body").to.have.property("closureDate");
		});
		it("Returns 200 with list informations, if owned", async () => {
			const result: any = GlobalVars.List1;
			const response = await chai
				.request(server)
				.get(baseUrl + "/" + GlobalVars.List1_Id + "?userId=" + GlobalVars.User1_Id)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(200);
			expect(response).to.have.property("body").to.deep.include(result);
			expect(response).to.have.property("body").to.have.property("sharingCode").to.be.a.string;
			expect(response).to.have.property("body").to.have.property("closureDate");
		});
	});
	describe("GET /", () => {
		it("Returns 200 with list informations", async () => {
			const result: any = [GlobalVars.List1, GlobalVars.List2];
			const response = await chai
				.request(server)
				.get(baseUrl + "?userId=" + GlobalVars.User1_Id + "&select=all")
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(200);
			expect(response).to.have.property("body").to.be.an("array");
			(response.body as any[]).forEach((element, index) => {
				expect(element).to.have.property("ownersIds").to.eql(result[index].ownersIds);
				expect(element).to.have.property("isShared").to.be.a("boolean");
				expect(element).to.have.property("sharingCode").to.be.a.string;
				expect(element).to.have.property("closureDate");
				expect(element).to.not.have.property("id");
				expect(element).to.not.have.property("owners");
				expect(element).to.not.have.property("grantedUsersIds");
				expect(element).to.not.have.property("grantedUsers");
				expect(element).to.not.have.property("createdDate");
				expect(element).to.not.have.property("updatedDate");
			});
		});
	});
	// SHARE A UNSHARED LIST OWNED -> Success
	// SHARE A UNSHARED LIST NOT OWNED -> Fail
	// SHARE A GRANTED LIST OWNED -> Success
	// SHARE A GRANTED LIST NOT OWNED -> Fail
	// UNSHARE A UNSHARED LIST OWNED -> Success
	// UNSHARE A UNSHARED LIST NOT OWNED -> Fail
	// UNSHARE A GRANTED LIST OWNED -> Success
	// UNSHARE A GRANTED LIST NOT OWNED -> Fail
	// ADD A UNKNOWN LIST FROM SHARING CODE -> Success
	// ADD A ALREADY ADDED LIST FROM SHARING CODE -> Success
	// DELETE A LIST NOT OWNED NOT GRANTED -> Fail
	// DELETE A LIST NOT OWNED BUT GRANTED -> Success Forget
	// DELETE A LIST MULTIPLE OWNED -> Success Forget
	// DELETE A LIST SINGLE OWNED -> Success Delete

	after(async () => {
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
