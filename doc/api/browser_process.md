# browser_process -- cross platform browser process creation

## SYNOPSIS

```js
function type(command);
function find(command, callback)
function options(command, options);
function spawn(command, [args], [options], callback);
```

# DESCRIPTION

The `browser_process` module provides uniform, cross platform browser process
spawning and command line option creation for `chrome`, `chromium` and
`firefox`.

Use `require('browser_process')` to access this module.

## SEE ALSO

[browser_process.find](api/browser_process.find.md),
[browser_process.type](api/browser_process.type.md),
[browser_process.options](api/browser_process.options.md),
[browser_process.spawn](api/browser_process.spawn.md)
