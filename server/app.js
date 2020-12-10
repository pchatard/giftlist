const path = require('path');
const express = require('express');
const cookies = require('cookie-parser');
require('dotenv').config();
const firebase = require('firebase/app');
require('firebase/database');
require('firebase/auth');
const api = require('./api/api');
const error = require('./api/errorHandler');
const firebaseConfig = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());
app.use(cookies());
app.use((req, res, next) => {
    req.db = database;
    req.auth = auth;
    next();
});
app.use('/api', api);

app.use(error);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
