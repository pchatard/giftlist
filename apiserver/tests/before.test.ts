import { before } from "mocha";
import request from "request";
import { GlobalVar } from "./global";

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

before((done) => {
	request.post(options, function (error, _response, body) {
		if (error) throw new Error(error);
		GlobalVar.Token = JSON.parse(body)["access_token"];
		done();
	});
});
