import 'mocha';
import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import request from "request"
import server from "../src/index"

chai.use(chaiHttp)

const options = { method: 'POST',
  url: 'https://giftlist-app.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    "client_id": "ByRAZpSlP13t4h0Lxl4CCGWSY71hmq2m",
    "client_secret": "_snhXvzpp9rR5UOSBEJpkZFsSn-tIfWeNCMz4WvI-w6MvbSlGOsPKJzmfbRrKldJ",
    "audience": "https://giftlist-api",
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