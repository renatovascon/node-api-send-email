const mongoose = require('mongoose');

const { Schema } = mongoose;

const fileSchema = new Schema({
    type: String,
    name: String
}, 
{ timeStamp: true })

const File = mongoose.model('File', fileSchema)

module.exports = File