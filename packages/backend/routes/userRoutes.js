const express = require('express');
const router = express.Router();

router.get('/auth-check', (req, res) => {
    // 'isAuthenticated()' compares cookie in request with stored session cookies, i.e. if it is stored or not.
    if (req.isAuthenticated()) {
        console.log('User authentication successful ID: ' + req.user.id);

        return res.status(200).json({
            authenticated: true,
            message: 'Authentication successful',
            user: req.user,
        });
    } else {
        console.log('User authentication rejected');

        return res.status(401).json({
            authenticated: false,
            message: 'Authentication rejected',
            user: null,
        });
    }
});

module.exports = router;
