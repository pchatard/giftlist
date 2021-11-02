//require("dotenv").config();
import { config } from "dotenv"
import express, { NextFunction, Request, Response } from "express";
import cookies from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import helmet from "helmet";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./config/firebase";

import router from "./routes";
import errorHandler from "./middlewares/error";
import { Database } from "@firebase/database";

import swaggerDocument from './config/swagger.json';

config();
const PORT = process.env.API_PORT;
const app: express.Application = express();

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(firebaseApp);
const auth: Auth = getAuth(firebaseApp);

app.use(express.json());
app.use(helmet());
app.use(cookies());

// Pass firebase instances to the requests
app.use((req: Request, _: Response, next: NextFunction): void => {
	req.database = database;
	req.auth = auth;
	next();
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

// Routes and Error handler
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
	console.info("API Server is listening on " + PORT)
})

module.exports = app;
