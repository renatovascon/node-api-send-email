const express = require('express');

const emailController = require('./controllers/emailController');
const router = express.Router();

// app.get('/', (req, res) =>{res.status(200).send('sdsds')})


router.post('/teste', emailController.sendEmail);

module.exports = router;