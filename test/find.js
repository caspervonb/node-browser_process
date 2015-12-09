'use strict';

const browser = require('..');
const test = require('tape');
const path = require('path');

const name = (process.env['TEST_BROWSER'] || 'chrome');

test(`find ${name}`, assert => {
  assert.plan(2);

  browser.find(name, (error, command) => {
    assert.error(error);
    assert.ok(path.isAbsolute(command));
  });
});
