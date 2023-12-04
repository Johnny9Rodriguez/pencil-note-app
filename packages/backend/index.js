const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/root', (req, res) => {
    res.status(200).json({ msg: 'Root' });
});

app.get('/login', (req, res) => {
    res.status(200).json({ msg: 'Okay!' });
});

const PORT = process.env.PORT || 7001;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});