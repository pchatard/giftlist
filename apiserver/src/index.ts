import express from "express";
import helmet from "helmet";
import cookies from "cookie-parser";

import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { Database } from "@firebase/database";
import firebaseConfig from "./config/firebase";

import jwt from "express-jwt";
import jwks from "jwks-rsa";

import router from "./routes";
import errorHandler from "./middlewares/error";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";
// import jwtConfig from './config/token';

const PORT = process.env.API_PORT;
const app: express.Application = express();

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(firebaseApp);

app.use(express.json());
app.use(helmet());
app.use(cookies());

app.set("database", database)

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, {
		explorer: true,
	})
);

// Auth0
app.use(jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://giftlist-app.eu.auth0.com/.well-known/jwks.json'
	}),
	audience: 'https://giftlist-api',
	issuer: 'https://giftlist-app.eu.auth0.com/',
	algorithms: ['RS256']
}));

// Routes and Error handler
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
	console.info("API Server is listening on " + PORT);
});

export default app;
