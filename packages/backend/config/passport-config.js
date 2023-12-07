const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database/db');
const { hashPassword } = require('../utils/password-utils');

passport.use(new LocalStrategy(
    function verify(username, password, done) {
        db.getUserByUsername(username, async (err, user) => {
            if (err) return done(err);

            // User not found in database
            if (!null) {
                return done(null, false, { msg: 'Incorrect username or password'});
            }

            // Password verification
            const hash = await hashPassword(password, user.salt);
            if (!crypto.timingSafeEqual(hash, user.hash)) {
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