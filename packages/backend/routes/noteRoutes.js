const express = require('express');
const db = require('../database/db');

const router = express.Router();

// =======================
// LOAD NOTES
// =======================
router.get('/:userId', async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.params.userId;

        const notes = (await db.loadUserNotes(userId)).rows;

        console.log(notes);

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

module.exports = router;
