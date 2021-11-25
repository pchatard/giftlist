import express from "express";
import cors from "cors";
import users from "./users";
import lists from "./lists";
import gifts from "./gifts";
import UserController from "../controllers/UserController";

const router = express.Router();

router.use(cors({ origin: "http://localhost:3000", credentials: true }));

/** Users router */
router.use("/users", users);

/** Lists router */
router.use("/lists", lists);

/** Gifts router */
router.use("/gifts", gifts);

router.route("/test").get(UserController.test);

export default router;
