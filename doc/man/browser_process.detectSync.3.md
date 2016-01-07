# browser_process.detectSync -- search for browser executables synchronously

## SYNOPSIS

```js
detectSync()
```

## DESCRIPTION

`detectSync` searches synchroniously in the known default vendor installation
directories for browser executables, returning an array of strings containing
absolute executable paths.

## RETURN VALUE

`detectSync` return an array of strings containing absolute paths to browser
executables on success.

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
