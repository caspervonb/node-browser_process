# browser_process.find -- search for a browser executable

## SYNOPSIS

```js
find(name, callback)
```

## PARAMETERS

`name` *String*
:   Specifies the name of a browser to find.

`callback` *Function*
:   Specifies the function to call on success or failure.

## DESCRIPTION

`find` searches asynchroniously in the known default vendor installation
directories for an executable of the browser with the specified `name`,
calling the specified `callback` function with the absolute executable path as
its second parameter. If an error occurs, the `callback` function is called with
the error as its first parameter instead.

## EXAMPLES

Find a firefox executable

```js
const browser = require('browser_process');

browser.find('firefox', (error, command) => {
  if (error) {
    return console.error('Could not find firefox (%s)', error);
  }

  console.log('Firefox found at %s', command);
});
```

## SEE ALSO

- [browser_process.options](browser_process.options.3.md)
- [browser_process.spawn](browser_process.spawn.3.md)
- [browser_process.type](browser_process.type.3.md)
