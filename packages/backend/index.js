const express = require('express');
const session = require('express-session');
const cors = require('cors');
const router = require('./router');
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
}));

// ========================
//  Server Setup
// ========================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: ['http://localhost:3000'],
  }));
app.use(router);

app.use(passport.initialize());
app.use(passport.session());

// ========================
//  Start Server
// ========================
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});