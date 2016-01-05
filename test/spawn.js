'use strict';

const browser = require('..');
const temp = require('temp');
const test = require('tape');
const http = require('http');
const path = require('path');

const name = (process.env['TEST_BROWSER'] || 'chrome');

test(`spawn ${name}`, assert => {
  assert.plan(3);

  let server = http.createServer();
  server.once('listening', () => {
    let address = server.address();

    let args = browser.options(name, {
      url: `http://localhost:${address.port}`,
      profile: (name == 'firefox') ? false : temp.path(name),
    });

    browser.spawn(name, args, (error, ps) => {
      assert.error(error, 'no error');
      assert.ok(ps, 'ps ok');

      ps.stdout.pipe(process.stdout);
      ps.stderr.pipe(process.stderr);

      server.once('request', () => {
        assert.comment('request');

        ps.once('close', () => {
          server.once('close', () => {
            assert.pass('close', 'close');
          });

          server.close();
        });

        ps.kill();
      });
    });
  });

  server.listen();
});
