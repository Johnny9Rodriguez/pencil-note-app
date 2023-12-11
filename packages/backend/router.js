const express = require('express');
const passport = require('./config/passport-config');
const db = require('./database/db');
const pwUtils = require('./utils/password-utils');

const router = express.Router();

router.get('/api/auth-check', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({ success: true, message: 'Authentication successful.', user: req.user });
    } else {
        return res.status(401).send('Cookie is not authenticated.')
    }
})

router.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            // Handle error (e.g., database error)
            return res.status(500).send('Internal server error.');
        }

        if (!user) {
            // Authentication failed
            return res.status(401).send('Authentication failed.');
        }

        // Authentication successful, you can also store user information in session or JWT token here
        req.login(user, (err) => {
            if (err) {
                return res.status(500).send('Internal server error.');
            }

            // Set cookie to 30 days if 'remember me'
            if (req.body.rememberMe) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
            }

            return res.status(200).json({ success: true, message: 'Authentication successful.', user });
        });
    })(req, res, next);
});

router.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    db.getUserByUsername(username, async (err, user) => {
        if (err) {
            throw err;
        }

        if (user) {
            return res.status(409).json({ message: 'Username already taken: ' + username });
        } else {
            const salt = pwUtils.generateSalt();
            const hash = await pwUtils.hashPassword(password, salt);

            await db.storeUser(username, hash, salt);
            return res.status(200).json({ message: 'User successfully registered: ' + username });
        }
    });
});

module.exports = router;
