import * as fs from "fs";
import { ConnectionOptions } from "typeorm";

export default {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	ssl: {
		ca: fs.readFileSync(process.env.DB_CERT || "undefined").toString(),
	},
	synchronize: true,
	logging: false,
} as ConnectionOptions;
