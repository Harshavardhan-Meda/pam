/* eslint-disable import/no-extraneous-dependencies */
const cypress = require('cypress');
const fse = require('fs-extra');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

const reportDir = 'mochawesome-report';

const generateReport = (options) => merge(options).then((report) => generator.create(report, options));

const cypressOptions = {
  config: { video: true },
  env: {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    IBM_ID_CLIENT_ID: process.env.IBM_ID_CLIENT_ID,
    ISSUER: process.env.ISSUER
  },
  headed: process.env.CI !== 'true'
};

const test = async () => {
  await fse.remove(reportDir);
  const { totalFailed } = await cypress.run(cypressOptions);
  await generateReport({ reportDir });
  process.exit(totalFailed);
};

module.exports = test();
