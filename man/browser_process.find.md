# browser_process.find -- search for the executable of a browser

## SYNOPSIS

```js
function find(command, callback);
```

## PARAMETERS

`command` *String*
:   The command or browser type to use.

`callback` *function(error, string)*
:   The callback function to invoke on failure or success.

## DESCRIPTION

Searches `process.env['PATH']` and default vendor directories for the given `command`, if `command` is a browser type it will be substituted for the platform specific executable name of that browser type.

When an executable is found, callback will be invoked with the command as the second parameter, if an error occurs callback will be invoked with the error as the first parameter.

## RETURN VALUE

`undefined`

## SEE ALSO

[browser_process.type](browser_process.type.md),
[browser_process.options](browser_process.options.md),
[browser_process.spawn](browser_process.spawn.md)
