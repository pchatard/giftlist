interface Auth0User {
	"https://giftlist-api/email": string;
}

declare namespace Express {
	interface Request {
		user: Auth0User;
	}
}
