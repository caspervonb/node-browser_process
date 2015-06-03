# browser_process -- Cross platform browser process creation.

[![Join the chat at https://gitter.im/caspervonb/node-browser_process](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/caspervonb/node-browser_process?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![browsers](https://cloud.githubusercontent.com/assets/157787/7900340/4ee6bb84-0783-11e5-9721-3139492ceba5.png)

## INSTALLATION

```sh
$ npm install browser_process
```

## USAGE

```js
var browser = require('browser_process');

// ...

var args = browser.options('chrome', {
  url: 'about:blank',
  profile: 'chrome_profile',
  window: true,
  debug: 4000,
});

browser.spawn('chrome', args, function(error, exe) {
  // ...
});
```

## DOCUMENTATION

See the [introduction](doc/readme.md) and [reference manual](doc/api/readme.md)

## SUPPORT

* If you need help, ask in the [chat](http://gitter.im/caspervonb/node-browser_process).
* If you found a bug, submit an [issue](https://github.com/caspervonb/node-browser_process/issues).
* If you have an idea, submit an [issue](https://github.com/caspervonb/node-browser_process/issues).
* If you’d like to ask a general question, [issue](https://github.com/caspervonb/node-browser_process/issues).
* If you want to contribute, submit a [pull request](https://github.com/caspervonb/node-browser_process/pulls).


## RELEASES

All notable changes are recorded in the [changelog](changelog.md)

## LICENSE

Copyright (c) 2015 Casper Beyer under the [MIT License](license.md)
