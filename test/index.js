var browser = require('..');
var path = require('path');
var test = require('tape');

var commands = [
  'chrome',
  'chromium',
  'firefox',
];

commands.forEach(function(command) {
  test('find ' + command, function(test) {
    test.plan(2);

    browser.find(command, function(error, executable) {
      test.error(error);
      test.ok(path.isAbsolute(executable));
    });
  });

  test('type of executable ' + command, function(test) {
    test.plan(2);

    browser.find(command, function(error, executable) {
      test.error(error);
      test.equal(browser.type(executable), command);
    });
  });

  test('spawn ' + command, function(test) {
    test.plan(2);

    browser.spawn(command, function(error, exe) {
      test.error(error);
      test.ok(exe);
      exe.kill();
    });
  });

  test('options for ' + command, function(test) {
    test.plan(1);

    var args = browser.options(command, {
      private: true,
      window: true,
      profile: 'profile_dir',
      debug: 4000,
      url: 'about:blank',
    });

    var values = {
      'chrome': [
        '--incognito',
        '--new-window',
        '--user-data-dir=profile_dir',
        '--remote-debugging-port=4000',
        'about:blank'
      ],

      'chromium': [
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
      ]
    }[command];

    test.deepEqual(args, values);
  });
});

test('errors', function(test) {
  test.plan(4);

  test.throws(function() {
    browser.options('bad_value', {});
  }, '//');

  test.throws(function() {
    browser.type('bad_value');
  }, '//');

  browser.find('bad_value', function(error) {
    test.ok(error);
  });

  browser.spawn('bad_value', function(error) {
    test.ok(error);
  });
});
