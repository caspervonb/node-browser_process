'use strict';

const child = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const which = require('which');

const debug = util.debuglog('browser_process');

const types = {
  chrome: 'chrome',
  chromium: 'chrome',
  electron: 'electron',
  firefox: 'firefox',
};

const paths = {
  chrome: (function() {
    let paths = [];

    if (process.platform == 'darwin') {
      paths = paths.concat([
        path.join(process.env['HOME'], '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'),
        '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
      ]);
    }

    if (process.platform == 'linux') {
      paths = paths.concat([
        'google-chrome',
      ]);
    }

    if (process.platform == 'win32') {
      paths = paths.concat([
        process.env['LOCALAPPDATA'] + '\\Google\\Chrome\\Application\\chrome.exe',
        process.env['PROGRAMFILES'] + '\\Google\\Chrome\\Application\\chrome.exe',
        process.env['PROGRAMFILES(X86)'] + '\\Google\\Chrome\\Application\\chrome.exe',
      ]);
    }

    return paths;
  }()),

  chromium: (function() {
    let paths = [];

    if (process.platform == 'darwin') {
      paths = paths.concat([
        path.join(process.env['HOME'], '/Applications/Chromium.app/Contents/MacOS/Chromium'),
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
      ]);
    }

    if (process.platform == 'linux') {
      paths = paths.concat([
        'chromium-browser',
      ]);
    }

    if (process.platform == 'win32') {
      paths = paths.concat([
        process.env['LOCALAPPDATA'] + '\\Chromium\\Application\\chrome.exe',
        process.env['PROGRAMFILES'] + '\\Chromium\\Application\\chrome.exe',
        process.env['PROGRAMFILES(X86)'] + '\\Chromium\\Application\\chrome.exe',
      ]);
    }

    return paths;
  }()),

  electron: (function() {
    let paths = [];

    if (process.platform == 'darwin') {
      paths = paths.concat([
        'node_modules/dist/Electron.app/Contents/MacOS/Electron',
        path.join(process.env['HOME'], '/Applications/Electron.app/Contents/MacOS/Electron'),
        '/Applications/Electron.app/Contents/MacOS/Electron',
        'Electron',
      ]);
    }

    if (process.platform == 'linux') {
      paths = paths.concat([
        'node_modules/electron-prebuilt/dist/electron',
      ]);
    }

    if (process.platform == 'win32') {
      paths = paths.concat([
        path.resolve('node_modules\\electron-prebuilt\\dist\\electron.exe'),
      ]);
    }

    return paths;
  }()),

  firefox: (function() {
    let paths = [];

    if (process.platform == 'darwin') {
      paths = paths.concat([
        '/Applications/Firefox.app/Contents/MacOS/Firefox',
        path.join(process.env['HOME'], '/Applications/Firefox.app/Contents/MacOS/Firefox'),
      ]);
    }

    if (process.platform == 'linux') {
      paths = paths.concat([
        'firefox',
      ]);
    }

    if (process.platform == 'win32') {
      paths = paths.concat([
        process.env['LOCALAPPDATA'] + '\\Mozilla\ Firefox\\firefox.exe',
        process.env['PROGRAMFILES'] + '\\Mozilla\ Firefox\\firefox.exe',
        process.env['PROGRAMFILES(X86)'] + '\\Mozilla\ Firefox\\firefox.exe',
      ]);
    }

    return paths;
  }()),
};

function type(identifier) {
  if (types[identifier]) {
    return types[identifier];
  }

  let basename = path.basename(identifier);
  let name = Object.keys(paths).find(name => {
    return paths[name].some(exename => {
      return basename === path.basename(exename);
    });
  });

  if (name) {
    return types[name];
  }

  throw Error('Bad browser command ' + command);
}

module.exports.type = type;

function find(identifier, callback) {
  if (path.isAbsolute(identifier)) {
    return callback(null, identifier);
  }

  if (!paths[identifier]) {
    let error = new Error('Invalid browser command');
    return callback(error);
  }

  let done = false;
  paths[identifier].forEach(filename => {
    which(filename, (error, command) => {
      if (error || done) {
        return;
      }

      done = true;
      callback(null, command);
    });
  });
}

module.exports.find = find;

function detect(callback) {
  let commands = [];

  let pending = 0;
  Object.keys(paths).forEach(name => {
    pending += paths[name].length;
    paths[name].forEach(filename => {
      which(filename, (error, command) => {
        if (command) {
          commands.push(command);
        }

        if (--pending == 0) {
          callback(commands.filter((value, index, array) => {
            return array.indexOf(value) == index;
          }));
        }
      });
    });
  });
}

module.exports.detect = detect;

function options(identifier, values) {
  let kind = type(identifier);
  let args = [];

  if (kind.match(/chrome/)) {
    if (values.debug) {
      args.push(`--remote-debugging-port=${values.debug}`);
    }

    if (values.private) {
      args.push(`--incognito`);
    }

    if (values.profile) {
      args.push(`--user-data-dir=${values.profile}`);
    }

    if (values.url) {
      args.push(values.url);
    }

    if (values.window) {
      args.push('--new-window');
    }

    args.push('--no-default-browser-check');
    args.push('--no-first-run');
  }

  if (kind.match(/electron/)) {
    if (values.debug) {
      args.push(`--remote-debugging-port=${values.debug}`);
    }

    if (values.url) {
      if (values.url.match(/^(file|http|about)/) || values.url.match(/\.html$/)) {
        args.push(require.resolve('./electron-browser'));
      }

      args.push(values.url);
    }
  }

  if (kind.match(/firefox/)) {
    if (values.debug) {
      args.push(`--start-debugging-server`, values.debug);
    }

    if (values.private) {
      args.push(`--private`);
    }

    if (values.profile) {
      args.push(`--profile`, values.profile);
    }

    if (values.url) {
      args.push(values.url);
    }

    if (values.window) {
      args.push('--new-window');
    }
  }

  return args;
}

module.exports.options = options;

function spawn(name, args, options, callback) {
  if (typeof args === 'function') {
    callback = args;
    args = undefined;
  } else if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  find(name, (error, command) => {
    if (error) {
      return callback(error);
    }

    fs.realpath(command, (error, command) => {
      if (error) {
        return callback(error);
      }

      debug('spawn %s %s', command, util.inspect(args));
      let ps = child.spawn(command, args, options);
      ps.once('error', callback);

      process.nextTick(function () {
        ps.removeListener('error', callback);
        callback(null, ps);
      });
    });
  });
}

module.exports.spawn = spawn;
