# browser_process -- cross platform browser process creation

## SYNOPSIS

## METHODS
```js
type(command)
find(command, callback)
options(command, options)
spawn(command, [args], [options], callback)
```

# DESCRIPTION

The `browser_process` module provides uniform, cross platform browser process
spawning and command line option creation for `chrome`, `chromium` and
`firefox`.

Use `require('browser_process')` to access this module.

## SEE ALSO

[browser_process.find](browser_process.find.3.md),
[browser_process.type](browser_process.type.3.md),
[browser_process.options](browser_process.options.3.md),
[browser_process.spawn](browser_process.spawn.3.md)
