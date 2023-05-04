const puppeteer = require('puppeteer');

module.exports = {
	createPdf: async function(html, options) {
	    try {
            const browser = await puppeteer.launch({
                executablePath: process.env.CHROMIUM_PATH,
                headless: true,
                args: ["--no-sandbox", "--disable-web-security"]
            });

            const page = await browser.newPage();

            await page.setContent(html, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });
            await page.emulateMediaType('screen');

            await page.pdf({
                pageRanges: '1',
                printBackground: true,
                ...options
            });
            await browser.close();
	    }
	    catch(err) {
            throw err
	    }
	}

};
