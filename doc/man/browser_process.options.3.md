# browser_process.options -- create command line arguments for a browser
## SYNOPSIS

```js
options(identifier, values)
```

## PARAMETERS

`identifier` *String*
:   The browser identifier to use.

`values` *Object*
:   `debug` *Integer*
:       Start with the debugger listening on the given port
:   `private` *Boolean*
:       Open in private browsing mode.
:   `profile` *Integer*
:       Start with the profile with the given path
:   `url` *String*
:       Open URL in a new tab or window
:   `window` *Boolean*
:       Open in a new window

## DESCRIPTION

Returns the given `values` an *Array* of command line arguments for the
browser defined by the given `identifier`. The identifier may be either an
absolute browser executable path or the name of a browser (`chrome`,
`chromium`, `electron` or `firefox`).

## RETURN VALUE

*Array*

## EXAMPLES

Launch chromium with remote debugging enabled

```js
const browser = require('browser_process');

let args = browser.options('chromium', {
  debug: 9222
});

browser.spawn('chromium', (error, ps) => {
  if (error) {
    return console.error('Unable to spawn chromium (%s)', error);
  }

  console.log('Chromium launched', ps.spawnfile);
});
```

## SEE ALSO

- [browser_process.find](browser_process.find.3.md)
- [browser_process.spawn](browser_process.spawn.3.md)
- [browser_process.type](browser_process.type.3.md)
