---
permalink: /changelog
---
# CHANGELOG

All notable changes to this project will be documented here.
This project adheres to [Semantic Versioning](http://semver.org/).

## 1.0.3 - 2015-08-04
### FIXED
- Fixed `type` to allow its `command` parameter to be a browser name,
as-well as a browser command.

## 1.0.3 - 2015-08-04
### FIXED
- Fixed a bug where `options` would not accept browser executable paths.

## 1.0.2 - 2015-08-04
### ADDED
- Added electron as a valid browser for `find` and `type`.

## FIXED
- Fixed an issue where calling `find` with `chromium` on Windows could result
in a chrome executable.

## 1.0.1 - 2015-06-16
### FIXED
- Fixed executable search paths on Windows.

## 1.0.0 - 2015-05-31
