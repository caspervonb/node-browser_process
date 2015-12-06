# browser_process.find -- search for the executable of a browser
## SYNOPSIS

```js
find(name, callback)
```

## PARAMETERS

`name` *String*
:   The name to use.

`callback` *Function*
:   The callback to use.

## DESCRIPTION

Searches default installation directories for an executable of a browser with
the given `name` which may be `chrome`, `chromium`, `electron` or `firefox`.

The callback is passed two arguments `(error, command)`, where `command` is
the absolute real resolved path to the browser executable.

## SEE ALSO

- [browser_process.options](browser_process.options.3.md)
- [browser_process.spawn](browser_process.spawn.3.md)
- [browser_process.type](browser_process.type.3.md)
