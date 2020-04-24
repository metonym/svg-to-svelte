# svg-to-svelte

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]

> Convert SVG files to Svelte components.

This library uses [svg-parser](https://github.com/Rich-Harris/svg-parser) to convert SVG files into Svelte components. The primary use case is to batch process entire icon libraries to be consumable in Svelte.

More generally, this utility experiments with augmenting HTML into Svelte.

## Install

Note: this module requires Node.js version 12 or greater.

```bash
yarn add -D svg-to-svelte
```

## Usage

### `generateFromFolder`

The fastest way is to specify the path to a folder that contains SVG elements.

The second parameter is the output directory. By default, it is "lib."

```js
const { generateFromFolder } = require("svg-to-svelte");

generateFromFolder("node_modules/gestalt/src/icons", "lib");
// reads all SVG files from the path "node_modules/gestalt/src/icons"
// generates a Svelte component per SVG file in the "lib" output folder
```

#### Options

An optional third argument passed to `generateFromFolder` include:

```ts
{
  clean: boolean; // remove/create output directory
  onModuleName: (moduleName: string) => string; // called when the moduleName is created
}
```

### `toSvelte`

The `toSvelte` method converts an SVG string to Svelte.

```js
const { toSvelte } = require("svg-to-svelte");

const result = toSvelte(`<svg ...></svg>`);
```

#### `result`

- `result.template`: Svelte file as a string
- `result.props`: Props passed to the top-level SVG element; this includes `...$$restProps` and forwarded events
- `result.children`: Children elements of the SVG element

### `toModuleName`

The `toModuleName` converts a file name to an exportable module name.

- `add-file.svg` --> `AddFile`
- `123--alt.svg` --> `_123Alt`

```ts
const { toModuleName } = require("svg-to-svelte");

const moduleName = toModuleName("add-file.svg");
```

### `cleanDir`

The `cleanDir` method is a utility to recursively remove a file directory and create an empty one.

```ts
const { cleanDir } = require("svg-to-svelte");

cleanDir("lib");
```

## [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svg-to-svelte.svg?color=blue
[npm-url]: https://npmjs.com/package/svg-to-svelte
[build]: https://travis-ci.com/metonym/svg-to-svelte.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/svg-to-svelte
