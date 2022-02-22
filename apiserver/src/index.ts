import cookies from "cookie-parser";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { createConnection } from "typeorm";

import cockroachDBOptions from "./config/ormconfig";
import swaggerDocument from "./config/swagger.json";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import Gift from "./models/Gift";
import List from "./models/List";
import User from "./models/User";
import { RegisterRoutes } from "./routes";

const PORT = process.env.API_PORT;
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookies());

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
	await createConnection({ ...cockroachDBOptions, entities: [User, List, Gift] });
});

export default app;
