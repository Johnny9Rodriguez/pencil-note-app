const express = require('express');
const passport = require('./config/passport-config');
const db = require('./database/db');
const pwUtils = require('./utils/password-utils');
const userRouter = require('./routes/userRoutes');

const router = express.Router();

router.use('/api/users', userRouter);

// router.get('/api/auth-check', (req, res) => {
//     if (req.isAuthenticated()) {
//         return res.status(200).json({ success: true, message: 'Authentication successful.', user: req.user });
//     } else {
//         return res.status(401).json({ message: 'Cookie is not authenticated.' });
//     }
// });

router.post('/api/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error destroying session');
            }

            res.clearCookie('connect.sid', { path: '/' });
            res.status(200).send('Logged out');
        });
    });
});

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

router.post('/api/note', async (req, res) => {
    if (req.isAuthenticated()) {
        const { userId } = req.body;

        try {
            const result = await db.createNote(userId);
            const noteId = result.rows[0].id;
            res.status(201).send({ message: 'Note created successfully', noteId: noteId });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal server error' });
        }
    }
});

router.put('/api/note', async (req, res) => {
    if (req.isAuthenticated()) {
        const { id, title, content } = req.body;

        console.log(id, title, content);

        try {
            await db.updateNote(id, title, content);
            res.status(204).send({ message: 'Note updated successfully' });

        } catch (error) {
            console.error(err);
            res.status(500).send({ message: 'Internal server error' });
        }
    }
});

router.delete('/api/note', async (req, res) => {
    if (req.isAuthenticated()) {
        const { noteId } = req.body;

        try {
            await db.deleteNote(noteId);
            res.status(202).send({ message: 'Note deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    }
})

router.get('/api/notes/:userId', async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.params.userId;

        try {
            const result = await db.loadNotes(userId);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error loading notes: ', error);
        }
    } else {
        res.status(401).send({ message: 'Unauthorized user' });
    }
});

module.exports = router;
