//serve assets to localhost because puppeteer dont allow access to local files for security reasons
//https://github.com/puppeteer/puppeteer/issues/1942

const p = require('path');
const fs = require('fs');

const Handlebars = require('handlebars');

const pdf = require('./utils/pdf');

Handlebars.registerHelper('eq', (a,b) => {
    return a==b
})

const data = {
        user: {
          firstname: 'ASIF',
          lastname: 'KHAN'
        },
        salt: 'somesalt',
        runAttempt: {
          id: 5894
        },
        run: {
            startString: 1548416975,
            endString: 154841699
        }
};

const templatePath = p.join(__dirname, './templates/' + 'django' + '.hbs')
const document = {
    template: fs.readFileSync(templatePath).toString('utf-8'),
    context: {
      data
    },
    options: {
        format: 'A4',
        landscape: true,
        printBackground: true,
        path: p.join(__dirname, 'test.pdf')    
    }
};
const template = Handlebars.compile(document.template);
let html = template(document.context);

//Adding base tag in html to fetch static content from localhost
const base = `<base href="http://localhost:8000/">`
html = html.replace(/(?:\<style\>)/, base + '<style>');


//sending html and pdf option to puppeteer
pdf.createPdf(html, document.options);
