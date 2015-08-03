var path = require('path');
var child = require('child_process');
var which = require('which');
var util = require('util');

var debug = util.debuglog('browser_process');

var browsers = {
  chrome: {
    command: {
      darwin: 'Google\ Chrome',
      linux: 'google-chrome',
      win32: 'chrome.exe'
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
  },

  chromium: {
    command: {
      darwin: 'Chromium',
      linux: 'chromium-browser',
      win32: 'chromium.exe'
    }[process.platform],

    paths: {
      darwin: [
        '/Applications/Chromium.app/Contents/MacOS',
      ],
      win32: [
        process.env['LOCALAPPDATA'] + '\\Chromium\\Application\\',
        process.env['PROGRAMFILES'] + '\\Chromium\\Application\\',
        process.env['PROGRAMFILES(X86)'] + '\\Chromium\\Application\\',
      ]
    }[process.platform],
  },

  firefox: {
    command: {
      darwin: 'Firefox',
      linux: 'firefox',
      win32: 'firefox.exe',
    }[process.platform],

    paths: {
      darwin: [
        '/Applications/Firefox.app/Contents/MacOS',
      ],
      win32: [
        process.env['LOCALAPPDATA'] + '\\Mozilla\ Firefox\\',
        process.env['PROGRAMFILES'] + '\\Mozilla\ Firefox\\',
        process.env['PROGRAMFILES(X86)'] + '\\Mozilla\ Firefox\\',
      ],
    }[process.platform],
  },
};

var browserOptions = {
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
  var values = Object.keys(browsers).filter(function (key) {
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
  var browserType = type(command);
  var args = [];

  var keys = Object.keys(options);
  keys.forEach(function (key) {
    var value = options[key];

    if (value !== undefined) {
      var option = browserOptions[browserType][key];

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

  find(command, function (error, command) {
    debug('spawn %s %s', command, util.inspect(args));

    if (error) {
      return callback(error);
    }

    var exe = child.spawn(command, args, options);
    exe.once('error', function (error) {
      callback(error);
    });

    process.nextTick(function () {
      callback(null, exe);
    });
  });
}

module.exports.spawn = spawn;
