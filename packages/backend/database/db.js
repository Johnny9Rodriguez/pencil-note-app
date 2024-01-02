require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_STRING,
});

function getUserByUsername(username, callback) {
    pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username],
        (error, result) => {
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
        }
    );
}

function getUserById(userId, callback) {
    pool.query(
        'SELECT * FROM users WHERE user_id = $1',
        [userId],
        (error, result) => {
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
        }
    );
}

function storeUser(username, hash, salt) {
    const query =
        'INSERT INTO users (username, pw_hash, pw_salt) VALUES ($1, $2, $3)';
    return pool.query(query, [username, hash, salt]);
}

function loadUserNotes(userId) {
    const query = 'SELECT notes, last_updated FROM notes WHERE user_id = $1';
    return pool.query(query, [userId]);
}

function storeUserNotes(userId, userNotes) {
    const lastUpdated = Date.now();
    const query =
        'INSERT INTO notes (user_id, notes, last_updated) VALUES ($1, $2::jsonb, $3) ON CONFLICT (user_id) DO UPDATE SET notes = EXCLUDED.notes, last_updated = EXCLUDED.last_updated';
    return pool.query(query, [userId, JSON.stringify(userNotes), lastUpdated]);
}

module.exports = {
    getUserByUsername,
    getUserById,
    storeUser,
    loadUserNotes,
    storeUserNotes,
};
