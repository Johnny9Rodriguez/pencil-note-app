const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
    console.log('ok');
    res.json({ msg: 'yo' });
});

module.exports = router;