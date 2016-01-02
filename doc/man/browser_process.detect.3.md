## NAME

`browser_process.detect` -- detect available browser executables

## SYNOPSIS

```js
detect(callback)
```

## PARAMETERS

`callback` *Function*
:   The callback to use.

## DESCRIPTION

Searches default installation directories for browser executables.

The callback is passed a single `(commands)` argument, which is an array of
absolute paths to browser executables.

## EXAMPLES

Detect available browsers

```js
const browser = require('browser_process');

browser.detect((commands) => {
  console.log('Found %s', commands);
});
```

## SEE ALSO

- [browser_process.options](browser_process.options.3.md)
- [browser_process.spawn](browser_process.spawn.3.md)
- [browser_process.type](browser_process.type.3.md)
