const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    const data = req.body;

    console.log(data)

    const requestData = {
        RecipientName: 'Joe',
        RecipientAddress: 'contact@joepytlik.de',
        Subject: 'Contact - Pencil App',
        Name: data.Name,
        Address: data.Address,
        Message: data.Message,
    };

    try {
        const response = await fetch(
            'https://joepytlik.de/services/api/mail/contact',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }
        );

        if (response.ok) {
            res.status(200).send({ message: 'Message successfully sent.' });
        } else {
            res.status(500).send({
                message: 'Internal Server Error.',
            });
        }
    } catch (error) {
        console.log('error catched');
        res.status(500).send({ message: 'Internal Server Error.' });
    }
});

module.exports = router;
