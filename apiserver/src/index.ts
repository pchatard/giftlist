require('dotenv').config();
import express from 'express';
import cookies from 'cookie-parser';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import firebaseConfig from './config/firebase';

import router from './routes';
import error from './middlewares/error';

const app = express();

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

app.use(express.json());
app.use(cookies());

// Pass firebase instances to the requests
app.use((req, _, next) => {
    req.db = database;
    req.auth = auth;
    next();
});

// Routes and Error handler
app.use(router);
app.use(error);

module.exports = app;
