'use strict';

const browser = require('..');
const test = require('tape');
const path = require('path');

const names = [
  'chrome',
  'chromium',
  'electron',
  'firefox',
];

names.forEach(function (name) {
  test('find ' + name, function (assert) {
    assert.plan(2);

    browser.find(name, function (error, command) {
      assert.error(error);
      assert.ok(path.isAbsolute(command));
    });
  });
});
