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

Object.keys(types).forEach(function (type) {
  test(type + ' options', function (assert) {
    assert.plan(1);
    var args = browser.options(type, {
      private: true,
      window: true,
      profile: 'profile_dir',
      debug: 4000,
      url: 'about:blank',
    });

    assert.deepEqual(args, types[type]);
  });
});