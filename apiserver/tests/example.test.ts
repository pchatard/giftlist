import 'mocha';
import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import request from "request"
import server from "../src/index"

chai.use(chaiHttp)

const options = {
  method: 'POST',
  url: process.env.AUTH0_TOKEN_URL,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    "client_id": process.env.AUTH0_CLIENT_ID,
    "client_secret": process.env.AUTH0_CLIENT_SECRET,
    "audience": process.env.AUTH0_AUDIENCE,
    "grant_type": "client_credentials"
  })
};

describe("Test", () => {
  const baseUrl = "/"
  
  var token: string = ""

  before(() => {
    request(options, function(error, _response, body) {
      if (error)
        throw new Error(error)
      token = JSON.parse(body)["access_token"]
    })
  })
  describe("POST /", () => {
    it("Returns 200 status-code", (done) => {
      const info = { }
      chai.request(server)
          .post(baseUrl + "/")
          .send(info)
          .set({ "Authorization": `Bearer ${token}` })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
         })
    })
  })
})