'use strict';

const browser = require('..');
const test = require('tape');
const path = require('path');

const name = (process.env['TEST_BROWSER'] || 'chrome');

test(`find ${name}`, assert => {
  assert.plan(5);

  browser.find(name, (error, command) => {
    assert.error(error);
    assert.ok(path.isAbsolute(command));

    browser.find(name, (error, executable) => {
      assert.error(error);
      assert.equal(command, executable);
    });
  });

  browser.find('invalid-name', error => {
    assert.ok(error);
  });
});

test(`find ${name} synchronously`, assert => {
  assert.plan(3);

  let command = browser.findSync(name);
  assert.ok(path.isAbsolute(command));

  assert.equal(command, browser.findSync(command));

  assert.throws(() => {
    browser.findSync('invalid-name');
  });
});
