const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');
const pgSession = require('connect-pg-simple')(session);
const passport = require('./config/passport-config');

const app = express();

// ========================
//  Session Setup
// ========================
const pool = new Pool({
    connectionString: process.env.DB_STRING
});

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

// ========================
//  Server Setup
// ========================
app.use(passport.initialize());
app.use(passport.session());

app.get('/api', (req, res) => {
    res.status(200).json({ msg: 'api' });
});

// ========================
//  Start Server
// ========================
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});