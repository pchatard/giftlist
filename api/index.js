require('dotenv').config();
const express = require('express');
const cookies = require('cookie-parser');
const firebase = require('firebase/app');
require('firebase/database');
require('firebase/auth');

const router = require('./routes');
const error = require('./middlewares/error');
const firebaseConfig = require('./config/firebase');

const app = express();

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();
const auth = firebase.auth();

app.use(express.json());
app.use(cookies());

// Pass firebase instances to the requests
app.use((req, res, next) => {
    req.db = database;
    req.auth = auth;
    next();
});

// Routes and Error handler
app.use(router);
app.use(error);

module.exports = app;
