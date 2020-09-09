/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
const puppeteer = require('puppeteer');
const retry = require('async-await-retry');

module.exports.ibmIdLogin = async function ibmIdLogin({ baseUrl, username, password }) {
  const doLogin = async (baseUrl, username, password) => {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      slowMo: 10
    });
    try {
      const page = await browser.newPage();
      await page.setViewport({
        width: 1280,
        height: 800
      });

      await page.goto(`${baseUrl}/login`);
      await page.click("button[type='button']");

      await page.waitForSelector('input#username');
      await page.type('input#username', username);
      await page.click('button#continue-button');

      await page.waitForSelector('input#password');
      await page.type('input#password', password);
      await page.click('button#signinbutton');

      await page.waitForSelector("div[data-cy='streamHeader']");

      const sidCookie = (await page.cookies()).find((cookie) => cookie.name === 'connect.sid');
      await browser.close();
      return sidCookie;
    } catch (error) {
      await browser.close();
      throw error;
    }
  };

  // rertry, because once in a while
  // doLogin will fail with 'Error: state does not match' for no reason
  return retry(doLogin, [baseUrl, username, password], { retriesMax: 5, interval: 100, exponential: true, factor: 2 });
};
