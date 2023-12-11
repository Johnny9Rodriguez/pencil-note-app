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

module.exports = { 
    getUserByUsername,
    getUserById, 
    storeUser 
};