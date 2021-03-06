# browser_process.find -- search for the executable of a browser synchronously

## SYNOPSIS

```js
findSync(name)
```

## PARAMETERS

* `name` *String*:  
    The name to use.

## DESCRIPTION

Searches default installation directories for an executable of a browser with
the given `name` which may be `chrome`, `chromium`, `electron` or `firefox`.

## RETURN VALUE

A string containing the absolute path to the browser executable.

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
