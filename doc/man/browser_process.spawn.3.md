# browser_process.spawn -- spawns a new browser process

## SYNOPSIS

```js
spawn(identifier [, args] [, options], callback)
```

## PARAMETERS

`identifier` *String*
:   The identifier to use.

`options` *Object*

`callback` *function(error, string)*
:   The callback function to invoke on failure or success.

## DESCRIPTION

Launches a new browser identified with the given `identifier` which may be either an absolute path to a browser executable, or the name of a browser (`chrome`, `chromium`, `electron` or `firefox`).

Command line arguments may be passed in `args`,
if omitted `args` will default to an empty array.

Options to control the working directory, environment and so forth may be
specified via the `options` parameter.

Both `args` and `options` are passed as-is to `child_process.spawn`.

The callback is passed two arguments `(error, browser)`, where `browser` is the resulting child process as returned `child_process.spawn`

## SEE ALSO

- [browser_process.find](browser_process.find.3.md)
- [browser_process.spawn](browser_process.spawn.3.md)
- [browser_process.type](browser_process.type.3.md)
