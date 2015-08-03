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
  test('find ' + name, function (assert) {
    assert.plan(2);

    browser.find(name, function (error, command) {
      assert.error(error);
      assert.ok(path.isAbsolute(command));
    });
  });
});