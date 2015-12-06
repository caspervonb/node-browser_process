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

names.forEach(name => {
  test('spawn ' + name, assert => {
    assert.plan(2);

    browser.spawn(name, (error, ps) => {
      assert.on('end', () => {
        if (ps) {
          ps.kill();
        }
      });

      assert.error(error);
      assert.ok(ps);
    });
  });
});
