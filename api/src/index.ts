import cookies from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { ConnectionOptions, createConnection } from "typeorm";

import cockroachDBOptions from "./config/ormconfig";
import swaggerDocument from "./config/swagger.json";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import { limiter } from "./middlewares/rate_limite";
import Gift from "./models/Gift";
import List from "./models/List";
import User from "./models/User";
import { RegisterRoutes } from "./routes";

config({ path: process.env.NODE_ENV == "dev" ? ".env.local" : ".env.test" });

export const dbConnection: ConnectionOptions = {
	...cockroachDBOptions,
	entities: [User, List, Gift],
};

const PORT = process.env.PORT;
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookies());
<<<<<<< HEAD
app.use(cors({ origin: "http://localhost:5173" }));
=======
const whitelist = [undefined, "http://localhost:5173", "https://giftlist-preview.netlify.app"];
const corsOptions = {
	origin: function (origin: any, callback: any) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error(`Not allowed by CORS ${origin} ${whitelist}`));
		}
	},
};
app.use(cors(corsOptions));
>>>>>>> v1

app.use(limiter);

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

const server = app.listen(PORT, async () => {
	await createConnection(dbConnection);
});

process.on("SIGTERM", () => {
	server.close(() => {
		null;
	});
});

export default app;
