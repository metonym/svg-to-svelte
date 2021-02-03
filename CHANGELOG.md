# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

- generate documentation
- custom svg element properties (filter, add)
- inject script/styles
- allow direction for adding a prop (i.e. before/after `$$restProps`)

## [2.1.1](https://github.com/metonym/svg-to-svelte/releases/tag/v2.1.1) - 2021-02-03

- remove sample code

## [2.1.0](https://github.com/metonym/svg-to-svelte/releases/tag/v2.1.0) - 2021-02-03

- add `generate` method

## [2.0.0](https://github.com/metonym/svg-to-svelte/releases/tag/v2.0.0) - 2020-08-25

- use sync behavior
- breaking change: by default, `generateFromFolder` will clean the output directory

## [1.1.2](https://github.com/metonym/svg-to-svelte/releases/tag/v1.1.2) - 2020-08-25

- fix async behavior

## [1.1.1](https://github.com/metonym/svg-to-svelte/releases/tag/v1.1.1) - 2020-08-25

- do not add component to exports if failed to generate

## [1.1.0](https://github.com/metonym/svg-to-svelte/releases/tag/v1.1.0) - 2020-08-25

- add `generateIndex` to generate icon index in Markdown format

## [1.0.1](https://github.com/metonym/svg-to-svelte/releases/tag/v1.0.1) - 2020-08-22

- fix `generateFromFolder` to handle duplicate module names

## [1.0.0](https://github.com/metonym/svg-to-svelte/releases/tag/v1.0.0) - 2020-08-04

- replace svg-parser with svelte compiler to componentize svg (Breaking change: `toSvelte` method no longer accepts a second parameter for options)

## [0.3.8](https://github.com/metonym/svg-to-svelte/releases/tag/v0.3.8) - 2020-05-10

- Hot fix: append class after `$$restProps`

## [0.3.7](https://github.com/metonym/svg-to-svelte/releases/tag/v0.3.7) - 2020-05-10

- Support optional `slot` for `toSvelte`

## [0.3.6](https://github.com/metonym/svg-to-svelte/releases/tag/v0.3.6) - 2020-05-10

- `$$restProps` should override default SVG attributes

## [0.3.5](https://github.com/metonym/svg-to-svelte/releases/tag/v0.3.5) - 2020-05-04

- Prefix first word with underscore that starts with a number

## [0.3.4](https://github.com/metonym/svg-to-svelte/releases/tag/v0.3.4) - 2020-05-03

- Move writeFile order

## [0.3.3](https://github.com/metonym/svg-to-svelte/releases/tag/v0.3.3) - 2020-05-03

- Push to moduleName, imports arrays before writing

## [0.3.2](https://github.com/metonym/svg-to-svelte/releases/tag/v0.3.2) - 2020-05-03

- Fix to ensure output directory is created

## [0.3.1](https://github.com/metonym/svg-to-svelte/releases/tag/v0.3.1) - 2020-05-03

- Promisify `fs` methods

## [0.3.0](https://github.com/metonym/svg-to-svelte/releases/tag/v0.3.0) - 2020-04-24

- Remove `generate` method

- Remove `svelte`, `prettier` from dependencies

## [0.2.1](https://github.com/metonym/svg-to-svelte/releases/tag/v0.2.1) - 2020-04-24

- Support clean option in `generateFromFolder`

## [0.2.0](https://github.com/metonym/svg-to-svelte/releases/tag/v0.2.0) - 2020-04-24

- Support optional `onModuleName` hook (`(moduleName: string) => moduleName`)

## [0.1.1](https://github.com/metonym/svg-to-svelte/releases/tag/v0.1.1) - 2020-04-24

- Drop Svelte formatting

## [0.1.0](https://github.com/metonym/svg-to-svelte/releases/tag/v0.1.0) - 2020-04-24

- Initial release
