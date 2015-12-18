'use strict';

const browser = require('..');
const test = require('tape');
const path = require('path');

test(`detect browsers`, assert => {
  assert.plan(1);

  browser.detect(results => {
    assert.ok(results);
  });
});

test(`detect browsers synchronously`, assert => {
  assert.plan(1);

  let results = browser.detectSync();
  assert.ok(results);
});
