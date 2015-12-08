---
layout: man
---
# browser_process.spawn -- launch a new browser process

## NAME
**browser_process.spawn** -- launch a new browser process

## SYNOPSIS

```js
spawn(identifier [, args] [, options], callback)
```

## PARAMETERS

`identifier` *String*
:   The identifier to use.

`args` *Array*
:   The command line arguments to use.

`options` *Object*
:   `cwd` *String*
    :   Current working directory of the browser process
:   `env` *Object*
    :   Environment variables in key-value pairs
:   `stdio` *Array*|*String*
    :   Standard I/O configuration
:   `detatched` *Boolean*
    :   Prepare process to run independently of its parent process.
:   `uid` *Number*
    :   Set the user identify of the process.
:   `gid` *Number*
    :   Set the group identify of the process.

`callback` *Function*
:   The callback to use.

## DESCRIPTION

Launches a new browser identified with the given `identifier` which may be either an absolute path to a browser executable, or the name of a browser (`chrome`, `chromium`, `electron` or `firefox`).

Command line arguments may be passed in `args`,
if omitted `args` will default to an empty array.

Options to control the working directory, environment and so forth may be
specified via the `options` parameter.

Both `args` and `options` are passed as-is to `child_process.spawn`.

The callback is passed two arguments `(error, browser)`, where `browser` is the resulting child process as returned `child_process.spawn`


## EXAMPLES

Launch chrome

```js
const browser = require('browser_process');

let args = browser.options('chromium', {
  debug: 9222
});

browser.spawn('chrome', (error, ps) => {
  if (error) {
    return console.error('Unable to spawn chrome (%s)', error);
  }

  console.log('Chrome launched', ps.spawnfile);
});
```

## SEE ALSO

- [browser_process.find](browser_process.find.3.html)
- [browser_process.spawn](browser_process.spawn.3.html)
- [browser_process.type](browser_process.type.3.html)
