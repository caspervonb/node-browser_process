'use strict';

const browser = require('..');
const test = require('tape');

const name = (process.env['TEST_BROWSER'] || 'chrome');

test(`chrome options`, { skip: !name.match(/chrome|chromium/) }, assert => {
  const options = {
    debug: {
      value: 4000,
      expect: [
        '--remote-debugging-port=4000',
        '--no-default-browser-check',
        '--no-first-run',
      ],
    },

    private: {
      value: true,
      expect: [
        '--incognito',
        '--no-default-browser-check',
        '--no-first-run',
      ],
    },

    profile: {
      value: '/profile/path',
      expect: [
        '--user-data-dir=/profile/path',
        '--no-default-browser-check',
        '--no-first-run',
      ],
    },

    url: {
      value: 'http://localhost:4000',
      expect: [
        'http://localhost:4000',
        '--no-default-browser-check',
        '--no-first-run',
      ],
    },

    window: {
      value: true,
      expect: [
        '--new-window',
        '--no-default-browser-check',
        '--no-first-run',
      ],
    },
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

test(`electron options`, { skip: !name.match(/electron/) }, assert => {
  const options = {
    debug: {
      value: 4000,
      expect: [
        '--remote-debugging-port=4000',
      ],
    },

    url: {
      value: 'index.js',
      expect: [
        'index.js',
      ],
    },
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

test(`chrome options`, { skip: !name.match(/firefox/) }, assert => {
  const options = {
    debug: {
      value: 4000,
      expect: [
        '--start-debugging-server',
        4000,
      ],
    },

    private: {
      value: true,
      expect: [
        '--private',
      ],
    },

    profile: {
      value: '/profile/path',
      expect: [
        '--profile',
        '/profile/path'
      ],
    },

    url: {
      value: 'http://localhost:4000',
      expect: [
        'http://localhost:4000',
      ],
    },

    window: {
      value: true,
      expect: [
        '--new-window',
      ],
    },
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
