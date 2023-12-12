require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_STRING
});

function getUserByUsername(username, callback) {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
        if (err) {
            console.error('Error in getUserByUsername', err);
            return callback(err, null);
        }

        if (result.rows.length === 0) {
            // User not found
            return callback(null, null);
        }

        // Return the user object
        return callback(null, result.rows[0]);
    });
}

function getUserById(id, callback) {
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error('Error in getUserByUsername', err);
            return callback(err, null);
        }

        if (result.rows.length === 0) {
            // User not found
            return callback(null, null);
        }

        // Return the user object
        return callback(null, result.rows[0]);
    });
}

function storeUser(username, hash, salt) {
    const query = 'INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3)';
    return pool.query(query, [username, hash, salt]);
}

function createNote(user_id) {
    const query = 'INSERT INTO notes (user_id, title, content) VALUES ($1, \'\', \'\') RETURNING id';
    return pool.query(query, [user_id]);
}

function deleteNote(note_id) {
    const query = 'DELETE FROM notes WHERE id = $1'
    return pool.query(query, [note_id]);
}

function updateNote(note_id, title, content) {
    const query = `
        UPDATE notes
        SET title = $1, content = $2
        WHERE id = $3
    `;
    return pool.query(query, [title, content, note_id]);
}

function loadNotes(user_id) {
    const query = 'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC';
    return pool.query(query, [user_id]);
}

module.exports = { 
    getUserByUsername,
    getUserById, 
    storeUser,
    createNote,
    deleteNote,
    updateNote,
    loadNotes
};