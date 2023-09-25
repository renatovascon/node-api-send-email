const PdfMake = require('pdfmake');
// const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const fs = require('fs');


const fonts = {
    Helvetica: {
        normal: "Helvetica"
    }
}

const printer = new PdfMake(fonts);

const docDefinition = {
    defaultStyle: { font: "Helvetica"},
    content: [
        {text: "ped document"}
    ]
}

const pdfDoc = printer.createPdfKitDocument(docDefinition);



const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'rvcoura90@gmail.com',
        pass: 'wwyukcrrclsrufjb'
    }
})


const createPdf = () => {
    pdfDoc.pipe(fs.createWriteStream("teste.pdf"));
    pdfDoc.end();
}

const sendEmail = async (req, res) => {
    try{
        await createPdf()
    } catch(error){
        console.log(error)
    } 
    transport.sendMail({
        from: 'rvcoura90@gmail.com',
        to: 'dev.renato.soares@gmail.com',
        subject: 'teste nodemailer',
        html: '<h1>testando</h1>',
        text: 'testando',
        attachments: [{
            filename: 'file.pdf',
            path: '../../teste.pdf',
            contentType: 'application/pdf'
          }],
    })
    .then(()=> console.log('email enviado'))
    .catch(()=> console.log('nao rolou'))

    return res.status(201).json({
        message: req.body
    })
};

module.exports = {
    sendEmail
}