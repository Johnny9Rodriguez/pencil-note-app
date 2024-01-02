const express = require('express');
const db = require('../database/db');

const router = express.Router();

// =======================
// LOAD NOTES
// =======================
router.get('/:userId', async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.params.userId;

        const noteData = await db.loadUserNotes(userId);

        if (!noteData) {
            console.error('Database loading error:', error);
            return res.status(500).json({
                notes: null,
                lastUpdated: null,
                message:
                    'Internal Server Error during loading notes from database',
            });
        }

        const notes = noteData.rows[0].notes;
        const lastUpdated = noteData.rows[0].last_updated;

        console.log('Loading notes successful:', userId);
        return res.status(200).json({
            notes: notes,
            lastUpdated: lastUpdated,
            message: 'Loading notes successful',
        });
    } else {
        res.status(401).json({
            notes: null,
            lastUpdated: null,
            message: 'Unauthorized access',
        });
    }
});

// =======================
// STORE NOTES
// =======================
router.post('/', async (req, res) => {
    if (req.isAuthenticated()) {
        const { userId, userNotes } = req.body;

        db.storeUserNotes(userId, userNotes)
            .then(() => {
                console.log('Storing notes successful: ', userId);
                res.status(200).json({
                    message: 'Notes stored successfully on server.',
                });
            })
            .catch(() => {
                res.status(500).json({
                    message:
                        'Internal Server Error during storing notes in database',
                });
            });
    }
});

module.exports = router;
