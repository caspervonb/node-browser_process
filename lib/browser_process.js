var path = require('path');
var child = require('child_process');
var which = require('which');
var util = require('util');
var fs = require('fs');

var debug = util.debuglog('browser_process');

var browsers = {
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
  if (browsers[command]) {
    return browsers[command].type;
  }

  var basename = path.basename(command);

  var key = Object.keys(browsers).filter(function (key) {
    return browsers[key].paths.some(function (exename) {
      return basename === path.basename(exename);
    });
  })[0];
 
  if (key) {
    return browsers[key].type;
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

  var done = false;
  browser.paths.forEach(function (exename) {
    which(exename, function (error, command) {
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
  var results = [];

  var pending = 0;
  Object.keys(browsers).forEach(function(name) {
    var browser = browsers[name];

    pending += browser.paths.length;
    browser.paths.forEach(function(filename) {
      fs.stat(filename, function(error, stat) {
        if (stat) {
          results.push({
            name: name,
            type: browser.type,
            command: filename
          });
        }

        if (--pending == 0) {
          callback(results);
        }
      });
    });
  });
}

module.exports.detect = detect;

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

function spawn(name, args, options, callback) {
  if (typeof args === 'function') {
    callback = args;
    args = undefined;
  } else if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  find(name, function (error, command) {
    if (error) {
      return callback(error);
    }

    fs.realpath(command, function(error, command) {
      if (error) {
        return callback(error);
      }

      debug('spawn %s %s', command, util.inspect(args));
      var exe = child.spawn(command, args, options);
      exe.once('error', function (error) {
        callback(error);
      });

      process.nextTick(function () {
        callback(null, exe);
      });
    });
  });
}

module.exports.spawn = spawn;