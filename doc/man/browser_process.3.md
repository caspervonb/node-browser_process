# browser_process -- cross platform browser detection and process creation
## METHODS
[`browser_process.find`](browser_process.find.3.md)
:   Search for a browser executable.

[`browser_process.options`](browser_process.find.3.md)
:   Generate browser command line arguments

[`browser_process.spawn`](browser_process.spawn.3.md)
:   Launch a new browser process

[`browser_process.type`](browser_process.find.3.md)
:   Get the type of a browser identifier

# DESCRIPTION

The `browser_process` module provides uniform, cross platform browser
detection, command line argument handling and process launching for `chrome`,
`chromium`, `electron` and `firefox`.

Use `require('browser_process')` to access this module.