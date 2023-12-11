const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database/db');
const { hashPassword } = require('../utils/password-utils');
const crypto = require('crypto');

passport.use(new LocalStrategy(
    function verify(username, password, done) {
        db.getUserByUsername(username, async (err, user) => {
            if (err) return done(err);

            // User not found in database
            if (!user) {
                return done(null, false, { msg: 'Incorrect username or password'});
            }

            // Password verification
            const hash = await hashPassword(password, user.salt);
                /*  Stored and newly generated hash are both in hexadecimal form.
                    For timingSafeEqual both objects must be of type Buffer,
                    hence the conversion. */
            const storedHash = Buffer.from(hash, 'hex');
            const userHash = Buffer.from(user.hash, 'hex');
            if (!crypto.timingSafeEqual(storedHash, userHash)) {
                return done(null, false, { msg: 'Incorrect username or password'});
            }

            return done(null, user);
        })
    }
));

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.getUserById(id, async (err, user) => {
        if (err) {
            return done(err);
        }

        return done(null, user);
    })
});

module.exports = passport;