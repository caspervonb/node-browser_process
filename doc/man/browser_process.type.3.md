# browser_process.type

## SYNOPSIS

```js
type(identifier)
```

## PARAMETERS
`identifier` *String*
:   The identifier to use

## DESCRIPTION

Returns the browser type the given browser `identifier` represents, where the
`identifier` may either be an absolute path to a browser executable, or the name
of a browser (`chrome`, `chromium`, `electron` or `firefox`).

## RETURN VALUE

`String`

## SEE ALSO

- [browser_process.find](browser_process.find.3.md)
- [browser_process.options](browser_process.options.3.md)
- [browser_process.spawn](browser_process.spawn.3.md)
