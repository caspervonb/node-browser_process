'use strict';

const browser = require('..');
const temp = require('temp');
const test = require('tape');
const http = require('http');

const name = (process.env['TEST_BROWSER'] || 'chrome');

test(`spawn ${name}`, { skip: name.match(/electron/) }, assert => {
  assert.plan(3);

  let server = http.createServer();
  server.once('listening', () => {
    let address = server.address();

    let args = browser.options(name, {
      url: `http://localhost:${address.port}`,
      profile: temp.path(name),
    });

    browser.spawn(name, args, (error, ps) => {
      assert.error(error);
      assert.ok(ps);

      server.once('request', () => {
        ps.once('close', () => {
          server.once('close', () => {
            assert.pass('close');
          });

          server.close();
        });

        ps.kill();
      });
    });
  });

  server.listen();
});

test(`spawn electron`, { skip: !name.match(/electron/) }, assert => {
  assert.plan(3);

  browser.spawn(name, ['--version'], (error, ps) => {
    assert.error(error);
    assert.ok(ps);

    ps.stdout.once('data', () => {
      ps.once('close', () => {
        assert.pass('close');
      });

      ps.kill();
    });
  });
});
