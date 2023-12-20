const express = require('express');
const db = require('../database/db');

const router = express.Router();

// =======================
// LOAD NOTES
// =======================
router.get('/:userId', async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.params.userId;

        const notes = (await db.loadNotes(userId)).rows;

        if (!notes) {
            console.error('Database loading error:', error);
            return res.status(500).json({
                notes: null,
                message:
                    'Internal Server Error during loading notes from database',
            });
        }

        console.log('Loading notes successful:', userId);
        return res.status(200).json({
            notes,
            message: 'Loading notes successful',
        });
    } else {
        res.status(401).json({ notes: null, message: 'Unauthorized access' });
    }
});

// =======================
// CREATE NOTE
// =======================
router.post('/', async (req, res) => {
    if (req.isAuthenticated()) {
        const { userId } = req.body;

        try {
            const noteId = (await db.createNote(userId)).rows[0].id;
            res.status(201).json({ noteId, message: 'New note created' });
        } catch (error) {
            console.log('Error creating new note:', error);
            res.status(500).json({
                noteId: null,
                message: 'Internal server error',
            });
        }
    }
});

module.exports = router;
