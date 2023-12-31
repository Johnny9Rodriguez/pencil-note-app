const express = require('express');
const db = require('./database/db');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');

const router = express.Router();

router.use('/api/users', userRouter);
router.use('/api/notes', noteRouter);

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
});

module.exports = router;
