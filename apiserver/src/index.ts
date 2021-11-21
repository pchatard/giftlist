import express/*, { NextFunction, Request, Response }*/ from "express";
import helmet from "helmet";
import cookies from "cookie-parser";

import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { Database } from "@firebase/database";
import firebaseConfig from "./config/firebase";

import router from "./routes";
import errorHandler from "./middlewares/error";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";
// import jwtConfig from './config/token';

const PORT = process.env.API_PORT;
const app: express.Application = express();

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(firebaseApp);
const auth: Auth = getAuth(firebaseApp);

app.use(express.json());
app.use(helmet());
app.use(cookies());

// Pass firebase instances to the requests
// app.use((req: Request, _: Response, next: NextFunction): void => {
// 	req.database = database;
// 	req.auth = auth;
// 	next();
// });

/*
app.use((_req: Request, res: Response, next: NextFunction): void => {
	res.set("Access-Control-Expose-Headers", jwtConfig.API_TOKEN_NAME);
	next()
})
*/
app.set("database", database)
app.set("auth", auth)

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, {
		explorer: true,
	})
);

// Routes and Error handler
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
	console.info("API Server is listening on " + PORT);
});

export default app;
