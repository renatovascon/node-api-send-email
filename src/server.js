const app = require('./app');

const mongoose = require('mongoose')

// const uri = "mongodb+srv://renato:<password>@cluster0.vwwjuot.mongodb.net/?retryWrites=true&w=majority";

const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3333;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vwwjuot.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log("conectado no mongo", "na porta", PORT)
    app.listen(PORT)
})


// app.listen(PORT, () => console.log(`Server working at port ${PORT}`))