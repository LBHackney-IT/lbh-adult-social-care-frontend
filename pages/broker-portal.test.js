const puppeteer = require('puppeteer');

describe('Broker Portal', () => {

  test('Adding task works correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false,
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1024,
        height: 768,
      },
      userAgent: '',
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.button');
    await page.click('.button');
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', process.env.TEST_USERNAME);
    await page.click('button');
    await page.waitForSelector('ewjnfmewknfmjkf');
    browser.close();
  }, 8000);
});
