import express from "express";
import cors from "cors";
import auth from "./auth";
import users from "./users";
import lists from "./lists";
import gifts from "./gifts";
import { authenticate } from "../middlewares/authenticate";
import UserController from "../controllers/UserController";

const router = express.Router();

router.use(cors({ origin: "http://localhost:3000", credentials: true }));

/** Authentication router */
router.use("/auth", auth);

/** Users router */
router.use("/users", authenticate, users);

/** Lists router */
router.use("/lists", authenticate, lists);

/** Gifts router */
router.use("/gifts", authenticate, gifts);

router.route("/test").get(UserController.test);

export default router;
