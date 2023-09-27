
const router = require('express').Router()

const emailController = require('../controllers/emailController');
const fileController = require('../controllers/fileController');

// app.get('/', (req, res) =>{res.status(200).send('sdsds')})


router.post('/teste', emailController.sendEmail);
router.post('/file', fileController.sendFile);
router.get('/file', fileController.getFiles)

module.exports = router;