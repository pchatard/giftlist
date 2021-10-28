require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import cookies from "cookie-parser";

import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./config/firebase";

import router from "./routes";
import errorHandler from "./middlewares/error";
import { Database } from "@firebase/database";

const app: express.Application = express();

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(firebaseApp);
const auth: Auth = getAuth(firebaseApp);

app.use(express.json());
app.use(cookies());

// Pass firebase instances to the requests
app.use((req: Request, _: Response, next: NextFunction): void => {
	req.database = database;
	req.auth = auth;
	next();
});

// Routes and Error handler
app.use(router);
app.use(errorHandler);

module.exports = app;
