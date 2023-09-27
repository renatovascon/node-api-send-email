const nodemailer = require('nodemailer');
const pdfLib = require('pdf-lib')
const { readFile, writeFile } = require('fs/promises');

const  { degrees, PDFDocument, rgb, StandardFonts } = pdfLib;

async function modifyPdf(input) {
    console.log(input)
//   const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
//   const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(await readFile('pdfexample.pdf'))
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()
  firstPage.drawText(input, {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  })

  const pdfBytes = await pdfDoc.save()
  await writeFile('teste.pdf', pdfBytes)
//   download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'rvcoura90@gmail.com',
        pass: 'wwyukcrrclsrufjb'
    }
})

const sendEmail = async (req, res) => {

    try{
        const text = JSON.stringify(req.body)
        modifyPdf(text)
    } catch (error) {
        res.status(400).send(error)
    }
    transport.sendMail({
        from: 'rvcoura90@gmail.com',
        to: 'dev.renato.soares@gmail.com',
        subject: 'teste nodemailer',
        html: '<h1>testando</h1>',
        text: 'testando',
        attachments: [{
            filename: 'file.pdf',
            path: 'teste.pdf',
            contentType: 'application/pdf'
        }],
    })
    .then(()=> console.log('email enviado'))
    .catch(()=> console.log('nao rolou'))
    
    // return res.status(201).json({
    //     message: req.body
    // })
};

module.exports = {
    sendEmail
}