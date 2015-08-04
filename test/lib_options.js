var browser = require('..');
var test = require('tape');

var types = {
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

Object.keys(names).forEach(function (name) {
  var type = names[name];

  test(name + ' options', function (assert) {
    assert.plan(3);

    var options = {
      private: true,
      window: true,
      profile: 'profile_dir',
      debug: 4000,
      url: 'about:blank',
    };

    var args = browser.options(name, options);
    assert.deepEqual(args, types[type]);

    browser.find(name, function (error, command) {
      assert.error(error);

      var args = browser.options(command, options);
      assert.deepEqual(args, types[type]);
    });
  });
});