const puppeteer = require('puppeteer');

module.exports = async function(html, options) {
    const browser = await puppeteer.launch({
        // args: ['--no-sandbox', '--allow-file-access-from-files'],
        headless: true
    });

    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: 'networkidle0'
    });

    await page.pdf(options);
    await browser.close();
};

