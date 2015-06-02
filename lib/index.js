const path = require('path');
const child = require('child_process');
const which = require('which');
const util = require('util');

const debug = util.debuglog('browser_process');

const browsers = {
  chrome: {
    command: {
      darwin: 'Google\ Chrome',
      linux: 'google-chrome',
      windows: 'chrome.exe'
    }[process.platform],

    paths: {
      darwin: [
        '/Applications/Google\ Chrome.app/Contents/MacOS',
      ],
      linux: [
        '/opt/google/chrome'
      ],
      win32: [
        process.env['LOCALAPPDATA'] + '\\Google\\Chrome\\Application\\',
        process.env['PROGRAMFILES'] + '\\Google\\Chrome\\Application\\',
        process.env['PROGRAMFILES(X86)'] + '\\Google\\Chrome\\Application\\',
      ],
    }[process.platform],

    options: {
      debug: '--remote-debugging-port=',
      profile: '--user-data-dir=',
      window: '--new-window',
      private: '--incognito',
    }
  },

  chromium: {
    command: {
      darwin: 'Chromium',
      linux: 'chromium-browser',
      windows: 'chromium.exe'
    }[process.platform],

    paths: {
      darwin: [
        '/Applications/Chromium.app/Contents/MacOS',
      ],
    }[process.platform],

    options: {
      debug: '--remote-debugging-port=',
      profile: '--user-data-dir=',
      window: '--new-window',
      private: '--incognito',
    }
  },

  firefox: {
    command: {
      darwin: 'Firefox',
      linux: 'firefox',
      windows: 'firefox.exe',
    }[process.platform],

    paths: {
      darwin: [
        '/Applications/Firefox.app/Contents/MacOS',
      ],
    }[process.platform],

    options: {
      debug: '--start-debugging-server',
      profile: '--profile',
      window: '--new-window',
      private: '--private',
    }
  },
};

function type(command) {
  var values = Object.keys(browsers).filter(function(key) {
    if (browsers[key].command === path.basename(command)) {
      return key;
    } else if (key === command) {
      return key;
    }
  });

  if (values.length > 0) {
    return values[0];
  }

  throw Error('Bad browser command ' + command);
}

module.exports.type = type;

function find(command, callback) {
  if (path.isAbsolute(command)) {
    return callback(null, command);
  }

  var browser = browsers[command];
  if (browser === undefined) {
    var error = new Error('Invalid browser command');
    return callback(error);
  }

  var paths = process.env['PATH'].split(path.delimiter);
  if (browser.paths) {
    paths.push.apply(paths, browser.paths);
  }

  which(browser.command, {
    path: paths.join(path.delimiter)
  }, callback);
}

module.exports.find = find;

function options(command, options) {
  var browser = browsers[type(command)];
  var args = [];

  var keys = Object.keys(options);
  keys.forEach(function(key) {
    var value = options[key];

    if (value !== undefined) {
      var option = browser.options[key];

      if (key === 'url') {
        args.push(value);
      } else if (option.match(/\S=$/)) {
        args.push(option + value);
      } else if (value === true) {
        args.push(option);
      } else {
        args.push(option, value.toString());
      }
    }
  });

  return args;
}

module.exports.options = options;

function spawn(command, args, options, callback) {
  if (typeof args === 'function') {
    callback = args;
    args = undefined;
  } else if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  if (typeof args === 'undefined') {
    args = [];
  }

  if (typeof options === 'undefined') {
    options = { };
  }

  find(command, function(error, command) {
    debug('spawn %s %s', command, args.join(' '));

    if (error) {
      return callback(error);
    }

    var exe = child.spawn(command, args, options);
    exe.once('error', function(error) {
      callback(error);
    });

    process.nextTick(function() {
      callback(null, exe);
    });
  });
}

module.exports.spawn = spawn;
