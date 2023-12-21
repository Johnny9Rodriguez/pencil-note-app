require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_STRING
});

function getUserByUsername(username, callback) {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, result) => {
        if (error) {
            console.error('Error in getUserByUsername', error);
            return callback(error, null);
        }

        if (result.rows.length === 0) {
            // User not found
            return callback(null, null);
        }

        // Return the user object
        return callback(null, result.rows[0]);
    });
}

function getUserById(userId, callback) {
    pool.query('SELECT * FROM users WHERE user_id = $1', [userId], (error, result) => {
        if (error) {
            console.error('Error in getUserByUsername', error);
            return callback(error, null);
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
    const query = 'INSERT INTO users (username, pw_hash, pw_salt) VALUES ($1, $2, $3)';
    return pool.query(query, [username, hash, salt]);
}

function loadUserNotes(userId) {
    const query = 'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at ASC';
    return pool.query(query, [userId]);
}

function storeUserNotes(userId, notes) {
    // @todo implement
}

module.exports = { 
    getUserByUsername,
    getUserById, 
    storeUser,
    loadUserNotes
};