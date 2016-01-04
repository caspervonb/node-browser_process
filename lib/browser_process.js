'use strict';

const child = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const util = require('util');

const debug = util.debuglog('browser_process');

const types = {
  chrome: 'chrome',
  chromium: 'chrome',
  electron: 'electron',
  firefox: 'firefox',
};

const paths = {
  chrome: {
    darwin: (function() {
      const suffix = `/Google Chrome.app/Contents/MacOS/Google Chrome`;
      const prefix = [
        '/Applications',
        path.join(os.homedir(), '/Applications'),
      ];

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),

    linux: (function() {
      const suffix = 'google-chrome';
      const prefix = process.env['PATH'].split(path.delimiter);

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),

    win32: (function() {
      const suffix = `\\Google\\Chrome\\Application\\chrome.exe`;
      const prefix = [
        process.env['LOCALAPPDATA'] || '',
        process.env['PROGRAMFILES'] || '',
        process.env['PROGRAMFILES(X86)'] || '',
      ];

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),
  }[process.platform],

  chromium: {
    darwin: (function() {
      const suffix = `/Chromium.app/Contents/MacOS/Chromium`;
      const prefix = [
        '/Applications',
        path.join(os.homedir(), '/Applications'),
      ];

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),

    linux: (function() {
      const suffix = 'chromium-browser';
      const prefix = process.env['PATH'].split(path.delimiter);

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),

    win32: (function() {
      const suffix = `\\Chromium\\Application\\chrome.exe`;
      const prefix = [
        process.env['LOCALAPPDATA'] || '',
        process.env['PROGRAMFILES'] || '',
        process.env['PROGRAMFILES(X86)'] || '',
      ];

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),
  }[process.platform],

  electron: {
    darwin: (function() {
      const suffix = `/Electron.app/Contents/MacOS/Electron`;
      const prefix = [
        '/Applications',
        path.join(os.homedir(), '/Applications'),
        path.resolve('node_modules/dist'),
      ];

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),

    linux: (function() {
      const suffix = 'electron';
      const prefix = [
        path.resolve('node_modules/electron-prebuilt/dist'),
      ].concat(process.env['PATH'].split(path.delimiter));

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),

    win32: (function() {
      const suffix = `electron.exe`;
      const prefix = [
        path.resolve('node_modules/electron-prebuilt/dist'),
      ];

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),
  }[process.platform],

  firefox: {
    darwin: (function() {
      const suffix = `/Firefox.app/Contents/MacOS/Firefox`;
      const prefix = [
        '/Applications',
        path.join(os.homedir(), '/Applications'),
      ];

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),

    linux: (function() {
      const suffix = 'firefox';
      const prefix = process.env['PATH'].split(path.delimiter);

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),
    win32: (function() {
      const suffix = `\\Mozilla Firefox\\firefox.exe`;
      const prefix = [
        process.env['LOCALAPPDATA'] || '',
        process.env['PROGRAMFILES'] || '',
        process.env['PROGRAMFILES(X86)'] || '',
      ];

      return prefix.map(prefix => {
        return path.join(prefix, suffix);
      });
    }()),
  }[process.platform],
};

function type(identifier) {
  if (types[identifier]) {
    return types[identifier];
  }

  let name = Object.keys(paths).find(name => {
    return paths[name].some(command => {
      return path.basename(identifier) === path.basename(command);
    });
  });

  if (!name) {
    throw new TypeError(`Invalid browser identifier \`${identifier}\``);
  }

  return types[name];
}

module.exports.type = type;

function find(identifier, callback) {
  if (path.isAbsolute(identifier)) {
    return fs.realpath(identifier, callback);
  }

  if (!paths[identifier]) {
    let error = new TypeError(`Invalid browser identifier \`${identifier}\``);
    return callback(error);
  }

  let commands = [];
  let pending = paths[identifier].length;

  paths[identifier].forEach((command, index) => {
    fs.realpath(command, (error, command) => {
      if (command) {
        commands.push({
          index,
          command,
        });
      }

      if (--pending == 0) {
        if (commands.length == 0) {
          return callback(new Error(`Unable to find browser \`${identifier}\``));
        }

        return callback(null, commands.sort((a, b) => {
          return a.index - b.index;
        }).map(pair => {
          return pair.command;
        }).find(command => {
          return command;
        }));
      }
    });
  });
}

module.exports.find = find;

function findSync(identifier) {
  if (path.isAbsolute(identifier)) {
    return fs.realpathSync(identifier);
  }

  if (!paths[identifier]) {
    throw new TypeError(`Invalid browser identifier \`${identifier}\``);
  }

  return paths[identifier].map(command => {
    try {
      return fs.realpathSync(command);
    } catch (error) { }
  }).find(command => {
    return command;
  });
}

module.exports.findSync = findSync;

function detect(callback) {
  let commands = [];

  let pending = 0;
  Object.keys(paths).forEach(name => {
    pending += paths[name].length;
    paths[name].forEach(command => {
      fs.realpath(command, (error, command) => {
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

function detectSync() {
  let commands = [];

  Object.keys(paths).forEach(name => {
    paths[name].forEach(command => {
      try {
        commands.push(fs.realpathSync(command));
      } catch (error) { }
    });
  });

  return commands.filter((value, index, array) => {
    return array.indexOf(value) == index;
  });
}

module.exports.detectSync = detectSync;

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

    debug('spawn %s %s', command, util.inspect(args));
    let ps = child.spawn(command, args, options);
    ps.once('error', callback);

    process.nextTick(function () {
      ps.removeListener('error', callback);
      callback(null, ps);
    });
  });
}

module.exports.spawn = spawn;
