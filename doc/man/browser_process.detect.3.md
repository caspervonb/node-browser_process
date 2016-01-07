# browser_process.detect -- search for browser executables

## SYNOPSIS

```js
detect(callback)
```

## PARAMETERS

`callback` *Function*
:   Specifies the function to call with the resulting executable paths.

## DESCRIPTION

`detect` searches asynchroniously in the known default vendor installation
directories for browser executables, calling the specified `callback` once
upon completion with an array of strings containing absolute executable paths.

## EXAMPLES

Detect available browsers

```js
const browser = require('browser_process');

browser.detect(commands => {
  console.log('browsers: \n%s', commands.join('\t\n'));
});
```

## SEE ALSO

- [browser_process.options](browser_process.options.3.md)
- [browser_process.spawn](browser_process.spawn.3.md)
- [browser_process.type](browser_process.type.3.md)
