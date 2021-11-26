interface Test {
	"https://giftlist-api/email": string;
}

declare namespace Express {
	interface Request {
		user: Test;
	}
}
