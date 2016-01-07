'use strict';

const browser = require('..');
const test = require('tape');
const path = require('path');

const name = process.env['TEST_BROWSER'];

const type = {
  'chrome': 'chrome',
  'chromium': 'chrome',
  'electron': 'electron',
  'firefox': 'firefox',
}[name];

test(`type of ${name}`, (assert) => {
  assert.plan(5);

  assert.equal(browser.type(name), type);
  browser.find(name, (error, command) => {
    assert.error(error);
    assert.equal(browser.type(command), type);
  });

  assert.throws(() => {
    browser.type('invalid');
  }, /TypeError/);

  assert.throws(() => {
    browser.type();
  }, /TypeError/);

});
