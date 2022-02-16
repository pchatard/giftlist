import { Database } from "@firebase/database";
import cookies from "cookie-parser";
import express from "express";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { createConnection } from "typeorm";

import firebaseConfig from "./config/firebase";
import cockroachDBOptions from "./config/ormconfig";
import swaggerDocument from "./config/swagger.json";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import List from "./models/List";
import User from "./models/User";
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
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
	await createConnection({ ...cockroachDBOptions, entities: [User, List] });
});

export default app;
