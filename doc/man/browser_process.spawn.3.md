# browser_process.spawn -- spawns a new browser process

## SYNOPSIS

```js
spawn(command, [args], [options], callback)
```

## PARAMETERS

`command` *String*
:   The command to use

`options` *Object*

`callback` *function(error, string)*
:   The callback function to invoke on failure or success.

## DESCRIPTION

Generates an array command line options for the browser defined by given `command` based on the given `options`.

## RETURN VALUE

`Array`

## SEE ALSO

[browser_process.find](browser_process.find.md),
[browser_process.type](browser_process.type.md),
[browser_process.spawn](browser_process.spawn.md)
