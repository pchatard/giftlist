if (!global.Promise) {
  global.Promise = require('q');
}

import 'mocha';
import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import server from "../src/index"

chai.use(chaiHttp)

describe("Auth", () => {
  const baseUrl = "/auth"

  describe("POST /register", () => {
    it("Register with new user returns 200 status-code", (done) => {
      const info = { email: "mocha@test.fr", password: "Test1!test" }
      chai.request(server)
          .post(baseUrl + "/register")
          .send(info)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
         })
    })
  })
  describe("POST /register", () => {
    it("Register with existing user returns 500 status-code with error", (done) => {
      const info = { email: "mocha@test.fr", password: "Test1!test" }
      chai.request(server)
          .post(baseUrl + "/register")
          .send(info)
          .end(function (err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(500);
            chai.expect(res.body).to.be.equal({name: "UserAlreadyExistsError", message: "Cet e-mail est déjà utilisé"})
            done();
         })
    })
  })
  describe("POST /login", () => {
    it("it should log the user and return a token", (done) => {
      done();
    })
  })
})