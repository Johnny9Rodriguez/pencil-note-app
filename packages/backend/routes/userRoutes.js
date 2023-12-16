const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../database/db');
const pwUtils = require('../utils/password-utils');

router.get('/auth-check', (req, res) => {
    // 'isAuthenticated()' compares cookie in request with stored session cookies, i.e. if it is stored or not.
    if (req.isAuthenticated()) {
        console.log('User authentication successful ID: ' + req.user.id);

        return res.status(200).json({
            authenticated: true,
            message: 'Authentication successful',
            user: { id: req.user.id, username: req.user.username },
        });
    } else {
        console.log('User authentication rejected');

        return res.status(401).json({
            authenticated: false,
            message: 'Authentication rejected',
            user: null,
        });
    }
});

router.post('/login', (req, res, next) => {
    // Invoke Passport.js authentication with local strategy, i.e. username and password.
    passport.authenticate('local', (error, user) => {
        if (error) {
            console.error('Authentication error:', error);
            return res.status(500).json({
                authenticated: false,
                message: 'Internal Server Error during authentication',
                user: null,
            });
        }

        if (!user) {
            console.log('User authentication rejected');
            return res.status(401).json({
                authenticated: false,
                message: 'Authentication rejected',
                user: null,
            });
        }

        // User authentication successful
        req.login(user, (error) => {
            if (error) {
                console.error('Login error:', error);
                return res.status(500).json({
                    authenticated: false,
                    message: 'Internal Server Error during login',
                    user: null,
                });
            }

            // Set cookie age
            if (req.body.rememberMe) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
            }

            console.log('Login successful:', user.id);
            return res.status(200).json({
                authenticated: true,
                message: 'Login successful',
                user: { id: user.id, username: user.username },
            });
        });
    })(req, res, next);
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    db.getUserByUsername(username, async (error, user) => {
        if (error) {
            console.error('Signup error:', error);
            return res
                .status(500)
                .json({ registered: false, message: 'Internal Server Error during signup' });
        }

        if (user) {
            return res
                .status(409)
                .json({ registered: false, message: 'Username already taken: ' + username });
        } else {
            const salt = pwUtils.generateSalt();
            const hash = await pwUtils.hashPassword(password, salt);

            await db.storeUser(username, hash, salt);
            return res
                .status(200)
                .json({ registered: true, message: 'User successfully registered: ' + username });
        }
    });
});

module.exports = router;
