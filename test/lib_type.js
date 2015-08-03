var browser = require('..');
var test = require('tape');

var names = {
  'chrome': 'chrome',
  'chromium': 'chrome',
  'electron': 'chrome',
  'firefox': 'firefox',
};

Object.keys(names).forEach(function (name) {
  test('type of ' + name, function (assert) {
    assert.plan(2);

    browser.find(name, function (error, command) {
      assert.error(error);
      assert.equal(browser.type(command), names[name]);
    });
  });
});