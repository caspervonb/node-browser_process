## NAME

`browser_process.detectSync` -- detect available browser executables synchronously

## SYNOPSIS

```js
detectSync()
```

## DESCRIPTION

Searches default installation directories for browser executables.

## RETURN VALUE

An array of strings containing absolute paths to browser executables.

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
