'use strict'

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ message: 'Hello World with route' });
});

module.exports = router;