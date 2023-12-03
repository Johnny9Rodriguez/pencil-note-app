const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Root');
});

app.get('/login', (req, res) => {
    res.status(200).send('Okay!');
});

const PORT = process.env.PORT || 7001;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});