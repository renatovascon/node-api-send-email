const File = require('../models/File');
const emailController = require('./emailController');


const sendFile = async(req, res) => {
    const { type, name } = req.body;

    const file = new File({
        type,
        name
    })

    try {

        await file.save()
        emailController.sendEmail(req, res)
        return res.status(201).json({
            message: req.body
        })
    } catch(error) {
        return res.status(500).json({
            error: error
        })
    }
}

const getFiles = async(req, res) => {
    const file = await File.find()
    res.send(file)
}

module.exports = {
    sendFile,
    getFiles
}