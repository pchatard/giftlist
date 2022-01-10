import express from "express";
import helmet from "helmet";
import cookies from "cookie-parser";
import { createConnection } from "typeorm";
import cockroachDBOptions from "./config/ormconfig";

import User from "./models/User";
import List from "./models/List";

import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { Database } from "@firebase/database";
import firebaseConfig from "./config/firebase";

import { errorHandler, notFoundHandler, tokenHandler } from "./middlewares/error";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";
import { RegisterRoutes } from "./routes";

const PORT = process.env.API_PORT;
const app: express.Application = express();

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(firebaseApp);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookies());

app.set("database", database);

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, {
		explorer: true,
	})
);

// Routes and Error handler
RegisterRoutes(app);
app.use(tokenHandler);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
	await createConnection({ ...cockroachDBOptions, entities: [User, List] });
});

export default app;
