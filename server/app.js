const path = require('path');
const express = require('express');
const firebase = require('firebase/app');
require('firebase/database');
const api = require('./api/api');
const error = require('./api/errorHandler');
const firebaseConfig = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());
app.use((req, res, next) => {
    req.db = database;
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
