# svg-to-svelte

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]

> Convert SVG files to Svelte components.

This utility library converts an SVG file into a Svelte component. The primary use case is to batch automate entire icon libraries to be consumable in Svelte.

More generally, this utility experiments with augmenting HTML into Svelte.

## Install

Note: this module requires Node.js version 12 or greater.

```bash
yarn add -D svg-to-svelte
```

## Usage

The fastest way is to specify the path to a folder that contains SVG elements.

The second parameter is the output directory. By default, it is "lib."

```js
const { generateFromFolder } = require("svg-to-svelte");

generateFromFolder("node_modules/gestalt/src/icons", "lib");
// reads all SVG files from the path "node_modules/gestalt/src/icons"
// generates a Svelte component per SVG file in the "lib" output folder
```

## [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svg-to-svelte.svg?color=blue
[npm-url]: https://npmjs.com/package/svg-to-svelte
[build]: https://travis-ci.com/metonym/svg-to-svelte.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/svg-to-svelte
