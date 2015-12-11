---
permalink: /
---
# node-browser_process

![Image](https://cloud.githubusercontent.com/assets/157787/7900340/4ee6bb84-0783-11e5-9721-3139492ceba5.png)

Cross platform and uniform browser detection, command line arguments handling and process
launching of chrome, chromium, electron and firefox for node.js.

## INSTALLATION

```sh
$ npm install [--save] browser_process
```

## USAGE

```js
const browser = require('browser_process');

const args = browser.options('chrome', {
  url: 'about:blank',
});

browser.spawn('chrome', args, (error, ps) => {
  if (error) {
    return console.error('Unable to launch chrome (%s)', error);
  }

  console.log('Launched chrome (%s)', ps.spawnfile);
});
```

## DOCUMENTATION

[See the documentation](doc/)

## SUPPORT

* If you need help, ask in the [chat](http://gitter.im/caspervonb/node-browser_process).
* If you found a bug, submit an [issue](https://github.com/caspervonb/node-browser_process/issues).
* If you have an idea, submit an [issue](https://github.com/caspervonb/node-browser_process/issues).
* If you’d like to ask a general question, [issue](https://github.com/caspervonb/node-browser_process/issues).
* If you want to contribute, submit a [pull request](https://github.com/caspervonb/node-browser_process/pulls).


## RELEASES

[See the changelog](changelog).

## LICENSE

The project is licensed under the [MIT License](license).
