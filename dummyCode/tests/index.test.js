const path = require('path');
const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(`file://${path.resolve(__dirname, '../index.html')}`);
});

afterAll(async () => {
  await browser.close();
});

describe('Example E2E Test', () => {
  it('should display the correct title', async () => {
    const title = await page.title();
    expect(title).toBe('Example Website');
  });

  it('should display the welcome message', async () => {
    const welcomeMessage = await page.$eval('h1', element => element.textContent);
    expect(welcomeMessage).toBe('Welcome to Example Website');
  });

  it('should display a paragraph with the correct text', async () => {
    const paragraphText = await page.$eval('p', element => element.textContent);
    expect(paragraphText).toBe('This is a simple webpage for testing.');
  });
});