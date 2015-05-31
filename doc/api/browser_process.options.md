# browser_process.options -- generate command line options for a browser

## SYNOPSIS

```js
function options(command, options);
```

## PARAMETERS

`command` *String*
:   The command or browser type to use.

`options` *Object*
:   `debug` *Integer*
    Start with the debugger listening on the given port
:   `private` *Boolean*
    Open in private browsing mode.
:   `profile` *Integer*
    Start with the profile with the given path
:   `url` *String*
    Open URL in a new tab or window
:   `window` *Boolean*
    Open in a new window

## DESCRIPTION

Generates an array command line options for the browser defined by given `command` based on the given `options`.

## RETURN VALUE

`Array`

## SEE ALSO

[browser_process.find](browser_process.find.md),
[browser_process.type](browser_process.type.md),
[browser_process.spawn](browser_process.spawn.md)
