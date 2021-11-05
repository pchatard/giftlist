let config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
};

if (process.env.NODE_ENV === "development") {
	config = {
		apiKey: process.env.FIREBASE_API_KEY_DEV,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN_DEV,
		databaseURL: process.env.FIREBASE_DATABASE_URL_DEV,
		projectId: process.env.FIREBASE_PROJECT_ID_DEV,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET_DEV,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_DEV,
		appId: process.env.FIREBASE_APP_ID_DEV,
	};
} else if (process.env.NODE_ENV === "test") {
	config = {
		apiKey: process.env.FIREBASE_API_KEY_TEST,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN_TEST,
		databaseURL: process.env.FIREBASE_DATABASE_URL_TEST,
		projectId: process.env.FIREBASE_PROJECT_ID_TEST,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET_TEST,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_TEST,
		appId: process.env.FIREBASE_APP_ID_TEST,
	};
}

export default config;
