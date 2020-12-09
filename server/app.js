const path = require('path');
const express = require('express');
const api = require('./api/api');
const error = require('./api/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use(express.json());
app.use('/api', api);
app.use(error);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
