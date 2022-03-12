import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 500,
	standardHeaders: true,
	legacyHeaders: false,
});
