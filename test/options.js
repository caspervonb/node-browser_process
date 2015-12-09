'use strict';

const browser = require('..');
const test = require('tape');

const name = (process.env['TEST_BROWSER'] || 'chrome');
const type = browser.type(name);

test(`chrome options`, { skip: !type.match(/chrome/) }, assert => {
  const options = {
    debug: { value: 4000, expect: ['--remote-debugging-port=4000'] },
    private: { value: true, expect: ['--incognito'] },
    url: { value: 'about:blank', expect: ['about:blank'] },
    window: { value: true, expect: ['--new-window'] },
  };

  const keys = Object.keys(options);

  assert.plan(keys.length * 3);

  keys.forEach(key => {
    let option = options[key];

    assert.deepEqual(browser.options(name, {
      [key]: option.value,
    }), option.expect);

    browser.find(name, (error, command) => {
      assert.error(error);
      assert.deepEqual(browser.options(command, {
        [key]: option.value,
      }), option.expect);
    });
  });
});

test(`firefox options`, { skip: !type.match(/firefox/) }, assert => {
  const options = {
    debug: { value: 4000, expect: ['--start-debugging-server', '4000'] },
    private: { value: true, expect: ['--private'] },
    url: { value: 'about:blank', expect: ['about:blank'] },
    window: { value: true, expect: ['--new-window'] },
  };

  const keys = Object.keys(options);

  assert.plan(keys.length * 3);

  keys.forEach(key => {
    let option = options[key];

    assert.deepEqual(browser.options(name, {
      [key]: option.value,
    }), option.expect);

    browser.find(name, (error, command) => {
      assert.error(error);
      assert.deepEqual(browser.options(command, {
        [key]: option.value,
      }), option.expect);
    });
  });
});
