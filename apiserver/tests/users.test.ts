import 'mocha';
import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import request from "request"
import server from "../src/index"
import FieldIsMissingError from '../src/errors/FieldIsMissingError';
import MailAlreadyUsedError from '../src/errors/UserErrors/MailAlreadyUsedError';
import MailIsInvalidError from '../src/errors/UserErrors/MailIsInvalidError';

chai.use(chaiHttp)

const options = {
  url: process.env.AUTH0_TOKEN_URL as string,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    "client_id": process.env.AUTH0_CLIENT_ID,
    "client_secret": process.env.AUTH0_CLIENT_SECRET,
    "audience": process.env.AUTH0_AUDIENCE,
    "grant_type": "client_credentials"
  })
};

describe("Test", () => {
  const baseUrl = "/users"
  
  var token: string = ""

  before((done) => {
    request.post(options, function(error, _response, body) {
      if (error)
        throw new Error(error)
      token = JSON.parse(body)["access_token"]
      done()
    })
  })

  describe("PUT /", () => {
    it("Returns 200 status-code if all data are provided", (done) => {
      const info: any = { email: "test1@test.fr", displayName: "TestUser1" }
      chai.request(server)
          .put(baseUrl + "/")
          .send(info)
          .set({ "Authorization": `Bearer ${token}` })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
         })
    })
    it("Returns JSON with fields if all data are provided", (done) => {
      const infoCreate: any = { email: "test2@test.fr", displayName: "TestUser2" }
      const infoReturned: any = { email: "test2@test.fr", displayName: "TestUser2" }
      chai.request(server)
          .put(baseUrl + "/")
          .send(infoCreate)
          .set({ "Authorization": `Bearer ${token}` })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.property("body").to.be.deep.equal(infoReturned);
            done();
         })
    })
    it("Returns 500 status-code, with custom error message, if email is already used", (done) => {
      const infoCreate: any = { email: "test2@test.fr", displayName: "TestUser2" }
      const error = new MailAlreadyUsedError()
      const errorReturned = { name: error.name, message: error.message};
      chai.request(server)
          .put(baseUrl + "/")
          .send(infoCreate)
          .set({ "Authorization": `Bearer ${token}` })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(500);
            expect(res).to.have.property("body").to.be.deep.equal(errorReturned);
            done();
         })
    })
    it("Returns 500 status-code, with custom error message, if email is malformed", (done) => {
      let infoCreate: any = { email: "test", displayName: "TestUser2" }
      const error = new MailIsInvalidError()
      const errorReturned = { name: error.name, message: error.message};
      chai.request(server)
          .put(baseUrl + "/")
          .send(infoCreate)
          .set({ "Authorization": `Bearer ${token}` })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(500);
            expect(res).to.have.property("body").to.be.deep.equal(errorReturned);
         })
      infoCreate = { email: "test@test", displayName: "TestUser2" }
      chai.request(server)
          .put(baseUrl + "/")
          .send(infoCreate)
          .set({ "Authorization": `Bearer ${token}` })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(500);
            expect(res).to.have.property("body").to.be.deep.equal(errorReturned);
          })
      infoCreate = { email: "test@15483.cdc.d", displayName: "TestUser2" }
      chai.request(server)
          .put(baseUrl + "/")
          .send(infoCreate)
          .set({ "Authorization": `Bearer ${token}` })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(500);
            expect(res).to.have.property("body").to.be.deep.equal(errorReturned);
            done();
        })
    })
    it("Returns 500 status-code, with custom error message, if one of fields is empty", (done) => {
      let infoCreate: any = { displayName: "TestUser2" }
      chai.request(server)
      .put(baseUrl + "/")
      .send(infoCreate)
          .set({ "Authorization": `Bearer ${token}` })
          .end(function (err, res) {
            let error = new FieldIsMissingError("email")
            let errorReturned = { name: error.name, message: error.message};
            expect(err).to.be.null;
            expect(res).to.have.status(500);
            expect(res).to.have.property("body").to.be.deep.equal(errorReturned);
         })
      infoCreate = { email: "test@test" }
      chai.request(server)
          .put(baseUrl + "/")
          .send(infoCreate)
          .set({ "Authorization": `Bearer ${token}` })
          .end(function (err, res) {
            let error = new FieldIsMissingError("displayName")
            let errorReturned = { name: error.name, message: error.message};
            expect(err).to.be.null;
            expect(res).to.have.status(500);
            expect(res).to.have.property("body").to.be.deep.equal(errorReturned);
            done();
        })
    })
  })
})