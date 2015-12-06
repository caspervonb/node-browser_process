'use strict';

const browser = require('..');
const test = require('tape');

const names = {
  'chrome': 'chrome',
  'chromium': 'chrome',
  'electron': 'chrome',
  'firefox': 'firefox',
};

Object.keys(names).forEach(name => {
  test('type of ' + name, assert => {
    assert.plan(2);

    browser.find(name, (error, command) => {
      assert.error(error);
      assert.equal(browser.type(command), names[name]);
    });
  });
});
