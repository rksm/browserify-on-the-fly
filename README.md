# browserify-on-the-fly [![Build Status](https://travis-ci.org/rksm/browserify-on-the-fly.png?branch=master)](https://travis-ci.org/rksm/browserify-on-the-fly)

This quickly brings node.js modules to your browser, no manual installs or any
housekeeping necessary.

## What is it?
Basically there are currently three parts doing the work:

1. npm wrapper
2. browserify wrapper
3. HTTP interface or JS API

The npm wrapper takes care of providing package installations on demand. These
are by default installed into a tmp/ folder that's located in the main project
directory.

The browserify wrapper will ensure that the packages installed by the first
step are bundled up into a single browser-digestible file.

The interfaces are for accessing this file.

## Usage

See [examples/example-server.js](). Start it with `node examples/example-server.js`.

## LICENSE

[MIT](LICENSE)