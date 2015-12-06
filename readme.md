# node-browser_process

![Image](https://cloud.githubusercontent.com/assets/157787/7900340/4ee6bb84-0783-11e5-9721-3139492ceba5.png)

Cross platform and uniform browser detection, command line arguments handling and process
launching of chrome, chromium, electron and firefox for node.js.

## INSTALLATION

```sh
$ npm install browser_process
```

## USAGE

```js
var browser = require('browser_process');

var args = browser.options('chrome', {
  url: 'about:blank',
});

browser.spawn('chrome', args, function(error, exe) {
  console.log('chrome open');
});
```

## DOCUMENTATION

[See the documentation](doc/readme.md)

## SUPPORT

* If you need help, ask in the [chat](http://gitter.im/caspervonb/node-browser_process).
* If you found a bug, submit an [issue](https://github.com/caspervonb/node-browser_process/issues).
* If you have an idea, submit an [issue](https://github.com/caspervonb/node-browser_process/issues).
* If you’d like to ask a general question, [issue](https://github.com/caspervonb/node-browser_process/issues).
* If you want to contribute, submit a [pull request](https://github.com/caspervonb/node-browser_process/pulls).


## RELEASES

[See the changelog](changelog.md).

## LICENSE

The project is licensed under the [MIT License](license.md).
