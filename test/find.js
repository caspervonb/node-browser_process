'use strict';

const browser = require('..');
const test = require('tape');
const path = require('path');

const name = process.env['TEST_BROWSER'];

test(`find ${name}`, assert => {
  assert.plan(2);

  browser.find(name, (error, command) => {
    assert.error(error);
    assert.ok(path.isAbsolute(command));
  });
});

test(`find ${name} synchronously`, assert => {
  assert.plan(1);

  let command = browser.findSync(name);
  assert.ok(path.isAbsolute(command));
});
