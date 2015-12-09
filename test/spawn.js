'use strict';

const browser = require('..');
const test = require('tape');
const path = require('path');

const name = (process.env['TEST_BROWSER'] || 'chrome');

test(`spawn ${name}`, assert => {
  assert.plan(3);

  browser.spawn(name, (error, ps) => {
    assert.error(error);
    assert.ok(ps);

    setTimeout(() => {
      ps.once('close', (code) => {
        assert.pass('close');
      });

      ps.kill();
    }, 1000);
  });
});
