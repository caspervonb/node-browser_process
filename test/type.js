'use strict';

const browser = require('..');
const test = require('tape');
const path = require('path');

const name = (process.env['TEST_BROWSER'] || 'chrome');

const type = {
  'chrome': 'chrome',
  'chromium': 'chrome',
  'electron': 'electron',
  'firefox': 'firefox',
}[name];

test(`type of ${name}`, (assert) => {
  assert.plan(3);

  assert.equal(browser.type(name), type);
  browser.find(name, (error, command) => {
    assert.error(error);
    assert.equal(browser.type(command), type);
  });
});
