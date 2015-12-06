'use strict';

const path = require('path');
const child = require('child_process');
const which = require('which');
const util = require('util');
const fs = require('fs');

const debug = util.debuglog('browser_process');

const browsers = {
  chrome: {
    type: 'chrome',
    paths: {
      darwin: [
        '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
        path.join(process.env['HOME'], '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'),
      ],
      linux: [
        'google-chrome'
      ],
      win32: [
        process.env['LOCALAPPDATA'] + '\\Google\\Chrome\\Application\\chrome.exe',
        process.env['PROGRAMFILES'] + '\\Google\\Chrome\\Application\\chrome.exe',
        process.env['PROGRAMFILES(X86)'] + '\\Google\\Chrome\\Application\\chrome.exe',
      ],
    }[process.platform],
  },

  chromium: {
    type: 'chrome',
    paths: {
      darwin: [
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        path.join(process.env['HOME'], '/Applications/Chromium.app/Contents/MacOS/Chromium'),
      ],
      linux: [
        'chromium-browser',
      ],
      win32: [
        process.env['LOCALAPPDATA'] + '\\Chromium\\Application\\chrome.exe',
        process.env['PROGRAMFILES'] + '\\Chromium\\Application\\chrome.exe',
        process.env['PROGRAMFILES(X86)'] + '\\Chromium\\Application\\chrome.exe',
      ]
    }[process.platform],
  },

  electron: {
    type: 'chrome',
    paths: {
      darwin: [
        '/Applications/Electron.app/Contents/MacOS/Electron',
        path.join(process.env['HOME'], '/Applications/Electron.app/Contents/MacOS/Electron'),
        'electron',
      ],
      linux: [
        'electron',
      ],
      win32: [
        'electron',
        'electron.cmd',
      ]
    }[process.platform],
  },
  firefox: {
    type: 'firefox',
    paths: {
      darwin: [
        '/Applications/Firefox.app/Contents/MacOS/Firefox',
        path.join(process.env['HOME'], '/Applications/Firefox.app/Contents/MacOS/Firefox'),
      ],
      linux: [
        'firefox',
      ],
      win32: [
        process.env['LOCALAPPDATA'] + '\\Mozilla\ Firefox\\firefox.exe',
        process.env['PROGRAMFILES'] + '\\Mozilla\ Firefox\\firefox.exe',
        process.env['PROGRAMFILES(X86)'] + '\\Mozilla\ Firefox\\firefox.exe',
      ],
    }[process.platform],
  },
};

const browserOptions = {
  chrome: {
    debug: '--remote-debugging-port=',
    profile: '--user-data-dir=',
    window: '--new-window',
    private: '--incognito',
  },

  firefox: {
    debug: '--start-debugging-server',
    profile: '--profile',
    window: '--new-window',
    private: '--private',
  }
};

function type(command) {
  if (browsers[command]) {
    return browsers[command].type;
  }

  let basename = path.basename(command);

  let key = Object.keys(browsers).find(key => {
    return browsers[key].paths.some(exename => {
      return basename === path.basename(exename);
    });
  });

  if (key) {
    return browsers[key].type;
  }

  throw Error('Bad browser command ' + command);
}

module.exports.type = type;

function find(identifier, callback) {
  if (path.isAbsolute(identifier)) {
    return callback(null, identifier);
  }

  let browser = browsers[identifier];
  if (browser === undefined) {
    let error = new Error('Invalid browser command');
    return callback(error);
  }

  let done = false;
  browser.paths.forEach(filename => {
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
  Object.keys(browsers).forEach(name => {
    let browser = browsers[name];

    pending += browser.paths.length;
    browser.paths.forEach(filename => {
      which(filename, (error, command) => {
        if (command) {
          commands.push(command);
        }

        if (--pending == 0) {
          callback(commands);
        }
      });
    });
  });
}

module.exports.detect = detect;

function options(command, values) {
  let browserType = type(command);
  let args = [];

  let keys = Object.keys(values).filter(key => {
    return values[key];
  }).forEach(key => {
    let value = values[key];
    let option = browserOptions[browserType][key];

    if (key === 'url') {
      args.push(value);
    } else if (option.match(/\S=$/)) {
      args.push(option + value);
    } else if (value === true) {
      args.push(option);
    } else {
      args.push(option, value.toString());
    }
  });

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
