# svg-to-svelte

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]

> Convert SVG files to Svelte components.

## Background

Today, a comprehensive UI design system typically ships with icons that underline its brand. Usually, icon components are generated from a folder containing raw SVG files. The reason for "componentizing" SVG files is to make it easier to consume in a library or framework like React, Vue, or Angular.

Svelte is a relatively new language; there are not many existing design systems that implement SVG icons as Svelte components.

This library uses the Svelte compiler to convert SVG icon libraries into Svelte components.

This is accomplished by the following:

- forward `$$restProps` to the SVG element
- forward common events: `click`, `mouseover`, `mouseenter`, `mouseleave`, `keydown`
- enable the default `slot`

```diff
- <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 1a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM7 20h10v-4H7v4z" fill="#767676" fill-rule="evenodd"/></svg>
+ <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...$$restProps} on:click on:mouseover on:mouseenter on:mouseleave on:keydown><slot /><path d="M17 1a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h10zM7 20h10v-4H7v4z" fill="#767676" fill-rule="evenodd" /></svg>
```

More generally, this utility experiments with augmenting plain HTML into Svelte.

Icon libraries generated using `svg-to-svelte`:

- **[svelte-atlastkit-icons](https://github.com/metonym/svelte-atlastkit-icons)** (Atlassian Atlaskit)

- **[svelte-baseui-icons](https://github.com/metonym/svelte-baseui-icons)**: (Uber Base Web)

- **[svelte-bootstrap-icons](https://github.com/metonym/svelte-bootstrap-icons)** (Bootstrap)

- **[svelte-eui-icons](https://github.com/metonym/svelte-eui-icons)** (Elastic EUI)

- **[svelte-gestalt-icons](https://github.com/metonym/svelte-gestalt-icons)** (Pinterest Gestalt)

- **[svelte-leafygreen-icons](https://github.com/metonym/svelte-leafygreen-icons)**: (MongoDB Leafygreen)

- **[svelte-polaris-icons](https://github.com/metonym/svelte-polaris-icons)** (Shopify Polaris)

- **[svelte-spectrum-icons](https://github.com/metonym/svelte-spectrum-icons)** (Adobe Spectrum)

## Install

**Note: this module requires Node.js version 12 or greater.**

```bash
yarn add -D svg-to-svelte
```

## Usage

### `generateFromFolder`

The fastest way is to specify the path to a folder that contains SVG elements.

The second parameter is the output directory. By default, it is "lib."

```js
const { generateFromFolder } = require("svg-to-svelte");

(async () => {
  await generateFromFolder("node_modules/gestalt/src/icons", "lib", {
    clean: true,
  });
  // reads all SVG files from the path "node_modules/gestalt/src/icons"
  // generates a Svelte component per SVG file in the "lib" output folder
})();
```

#### Options

An optional third argument passed to `generateFromFolder` include:

```ts
interface GenerateFromFolderOptions {
  clean: boolean; // remove and create output directory
  onModuleName: (moduleName: string) => string; // called when the moduleName is created
}
```

### `toSvelte`

The `toSvelte` method converts an SVG string to Svelte.

```js
const { toSvelte } = require("svg-to-svelte");

const result = toSvelte(`<svg ...></svg>`);
/**
 * `result.template`: Svelte file as a string
 */
```

### `toModuleName`

The `toModuleName` converts a file name to an exportable module name.

- `add-file.svg` --> `AddFile`
- `123--alt.svg` --> `_123Alt`

```ts
const { toModuleName } = require("svg-to-svelte");

toModuleName("add-file.svg"); // AddFile
```

### `cleanDir`

The `cleanDir` method is an asynchronous method that removes and creates a directory.

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
