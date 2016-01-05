## NAME

`browser_process.type` -- get the type of a browser identifier

## SYNOPSIS

```js
type(identifier)
```

## PARAMETERS

* `identifier` *String*:  
    The identifier to use

## DESCRIPTION

Returns the browser type the given browser `identifier` represents, where the
`identifier` may either be an absolute path to a browser executable, or the name
of a browser (`chrome`, `chromium`, `electron` or `firefox`).

## RETURN VALUE

A *String* containing the browser type.

## EXAMPLE

Get the type of a browser name

```js
const browser = require('browser_process');
const assert = require('assert');

let type = browser.type('chromium');
assert.equal(type, 'chrome');
```

Get the type of a browser executable path

```js
const browser = require('browser_process');
const assert = require('assert');

let type = browser.type('/opt/chromium/chromium-browser');
assert.equal(type, 'chrome');
```

## SEE ALSO

- [browser_process.find](browser_process.find.3.md)
- [browser_process.options](browser_process.options.3.md)
- [browser_process.spawn](browser_process.spawn.3.md)
