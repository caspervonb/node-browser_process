var browser = require('..');
var test = require('tape');
var path = require('path');

var names = [
  'chrome',
  'chromium',
  'electron',
  'firefox',
];

names.forEach(function (name) {
  test('spawn ' + name, function (assert) {
    assert.plan(2);

    browser.spawn(name, function (error, ps) {
      assert.on('end', function () {
        if (ps) {
          ps.kill();
        }
      });

      assert.error(error);
      assert.ok(ps);
    });
  });
});