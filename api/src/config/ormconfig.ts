/* eslint-disable security/detect-non-literal-fs-filename */
import { config } from "dotenv";
import * as fs from "fs";
import { DataSourceOptions } from "typeorm";

config({ path: process.env.NODE_ENV == "dev" ? ".env.local" : ".env.test" });

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
} as DataSourceOptions;
