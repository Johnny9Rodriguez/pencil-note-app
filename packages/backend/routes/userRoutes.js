const express = require('express');
const passport = require('passport');
const db = require('../database/db');
const pwUtils = require('../utils/password-utils');
const chalk = require('chalk');

const router = express.Router();

// =======================
// CHECK AUTHENTICATION
// =======================
router.get('/auth-check', (req, res) => {
    // 'isAuthenticated()' compares cookie in request with stored session cookies, i.e. if it is stored or not.
    if (req.isAuthenticated()) {
        console.log(
            'User authentication successful:\n ',
            chalk.dim(req.user.user_id)
        );

        return res.status(200).json({
            authenticated: true,
            message: 'Authentication successful',
            user: {
                userId: req.user.user_id,
                username: req.user.username,
            },
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

// =======================
// LOGIN
// =======================
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

            console.log('New login:\n ', chalk.dim(user.user_id));

            return res.status(200).json({
                authenticated: true,
                message: 'Login successful',
                // @todo add encryption key to user
                user: { userId: user.user_id, username: user.username },
            });
        });
    })(req, res, next);
});

// =======================
// LOGOUT
// =======================
router.post('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout(function (error) {
            if (error) {
                return res.status(500).json({
                    userLogout: false,
                    message: 'Internal Server Error during logout',
                });
            }

            req.session.destroy((error) => {
                if (error) {
                    return res.status(500).json({
                        userLogout: false,
                        message:
                            'Internal Server Error during session destruction',
                    });
                }

                res.clearCookie('connect.sid', { path: '/' });
                return res
                    .status(200)
                    .json({ userLogout: true, message: 'Logout successful' });
            });
        });
    } else {
        res.status(401).json({ notes: null, message: 'Unauthorized request' });
    }
});

// =======================
// SIGNUP
// =======================
router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    db.getUserByUsername(username, async (error, user) => {
        if (error) {
            console.error('Signup error:', error);
            return res.status(500).json({
                registered: false,
                message: 'Internal Server Error during signup',
            });
        }

        if (user) {
            return res.status(409).json({
                registered: false,
                message: 'Username already taken: ' + username,
            });
        } else {
            const salt = pwUtils.generateSalt();
            const hash = await pwUtils.hashPassword(password, salt);

            console.log('New user:\n ', chalk.dim(username));

            await db.storeUser(username, hash, salt);
            return res.status(200).json({
                registered: true,
                message: 'User successfully registered: ' + username,
            });
        }
    });
});

// =======================
// DELETE USER
// =======================
router.delete('/delete', (req, res) => {
    if (req.isAuthenticated()) {
        const { userId } = req.body;

        db.deleteUser(userId)
            .then(() => {
                console.log('Account deleted:\n', chalk.dim(userId));
                res.status(200).json({
                    deleted: true,
                    message: 'Account deleted.',
                });
            })
            .catch(() => {
                res.status(500).json({
                    deleted: false,
                    message: 'Internal Server Error when deleting account',
                });
            });
    }
});

module.exports = router;
