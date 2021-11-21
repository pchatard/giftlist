var suffix: string = ""
if (process.env.NODE_ENV) {
	suffix = "_" + process.env.NODE_ENV
}

export default {
	apiKey: process.env["FIREBASE_API_KEY" + suffix],
	authDomain: process.env["FIREBASE_AUTH_DOMAIN" + suffix],
	databaseURL: process.env["FIREBASE_DATABASE_URL" + suffix],
	projectId: process.env["FIREBASE_PROJECT_ID" + suffix],
	storageBucket: process.env["FIREBASE_STORAGE_BUCKET" + suffix],
	messagingSenderId: process.env["FIREBASE_MESSAGING_SENDER_ID" + suffix],
	appId: process.env["FIREBASE_APP_ID" + suffix],
};
