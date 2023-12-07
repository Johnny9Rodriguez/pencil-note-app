const crypto = require('crypto');

function hashPassword(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 10000, 32, 'sha256', (err, hash) => {
            if (err) reject(err);
            else resolve(hash.toString('hex'));
        })
    })
}

function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

module.exports = {
    hashPassword,
    generateSalt
}