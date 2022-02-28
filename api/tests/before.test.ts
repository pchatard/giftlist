import "mocha";

import { config } from "dotenv";
import * as fs from "fs";
import request from "request";

import { GlobalVar } from "./global";

config({ path: process.env.NODE_ENV == "dev" ? ".env.local" : ".env.test" });

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
	// Tricky hack to ask token only if expired
	const data = fs.readFileSync("./tests/.env", { encoding: "utf-8" });
	const lines = data.split(/\r?\n/);
	const readDate = new Date(lines[0].split("DATE=")[1]);
	if (getUnixTimestamp(readDate) + 172800 > getUnixTimestamp(new Date())) {
		GlobalVar.Token = lines[1].toString().split("TOKEN=")[1];
		done();
	} else {
		let newValues = replaceDate(data);
		request.post(options, function (error, _response, body) {
			if (error) throw new Error(error);
			const token = JSON.parse(body)["access_token"];
			GlobalVar.Token = token;
			fs.writeFileSync("./tests/.env", replaceToken(newValues, token));
			done();
		});
	}
});

const getUnixTimestamp = (date: Date) => Math.floor(date.getTime() / 1000);

const replaceDate = (str: string) => {
	const newDate = "DATE=" + new Date().toISOString();
	return str ? str.replace(/^DATE=.*$/gm, newDate) : str.concat(newDate + "\n");
};

const replaceToken = (str: string, token: string) => {
	const newToken = "TOKEN=" + token;
	return str.split("TOKEN=").length > 1
		? str.replace(/^TOKEN=.*$/gm, newToken)
		: str.concat(newToken);
};
