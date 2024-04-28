const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer')
 
async function printPDF() {
  if(fs.existsSync(path.resolve(__dirname, 'myPdf.pdf'))){
    return path.resolve(__dirname, 'myPdf.pdf');
  }
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://blog.risingstack.com', {waitUntil: 'networkidle0'});
    const pdf = await page.pdf({ format: 'A4' });
    const fPath = path.resolve(__dirname, 'myPdf.pdf');
    await browser.close();
    fs.writeFileSync(fPath,pdf);
    return fPath;
  }
  catch(e){
    console.error(e);
    throw new Error('Unable to open browser',e);
  }

};

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/pdf', (req,res) => {
  printPDF().then(pdf =>{
    res.download(pdf, 'example.pdf');    
  }).catch((e => {
    console.error('couldnt return file');
  }))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

