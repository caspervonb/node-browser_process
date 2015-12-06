'use strict';

const browser = require('..');
const test = require('tape');

const types = {
  'chrome': [
    '--incognito',
    '--new-window',
    '--user-data-dir=profile_dir',
    '--remote-debugging-port=4000',
    'about:blank'
  ],

  'firefox': [
    '--private',
    '--new-window',
    '--profile', 'profile_dir',
    '--start-debugging-server', '4000',
    'about:blank'
  ],
};

var names = {
  'chrome': 'chrome',
  'chromium': 'chrome',
  'electron': 'chrome',
  'firefox': 'firefox',
};

Object.keys(names).forEach(name => {
  let type = names[name];

  test(name + ' options', assert => {
    assert.plan(3);

    let options = {
      private: true,
      window: true,
      profile: 'profile_dir',
      debug: 4000,
      url: 'about:blank',
    };

    let args = browser.options(name, options);
    assert.deepEqual(args, types[type]);

    browser.find(name, (error, command) => {
      assert.error(error);

      let args = browser.options(command, options);
      assert.deepEqual(args, types[type]);
    });
  });
});
