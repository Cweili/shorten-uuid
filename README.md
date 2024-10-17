# shorten-uuid

[![npm][badge-version]][npm]
[![bundle size][badge-size]][bundlephobia]
[![npm downloads][badge-downloads]][npm]
[![license][badge-license]][license]


[![github][badge-issues]][github]
[![build][badge-build]][workflows]
[![coverage][badge-coverage]][coveralls]


Shorten UUID to a string of length 24.

The encoded character range is `-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz`.

The result is applicable to the URL and WeChat QR code.

## Installation

### NPM

```
npm install shorten-uuid
```

```js
import shortenUuid from 'shorten-uuid';
```

### Browser

Direct `<script>` include

```html
<script src="https://cdn.jsdelivr.net/npm/shorten-uuid"></script>
```

## Usage

```js
const characters = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz' // default value
const { encode, decode } = shortenUuid(characters);

const uuid = '2358e803-12d4-4741-8432-63e9137bd39b';
const encoded = encode(uuid); // -> 1CNDV20AJ3S07Fm5Ed0CvCDQ
decode(encoded); // -> 2358e803-12d4-4741-8432-63e9137bd39b
```

[badge-version]: https://img.shields.io/npm/v/shorten-uuid.svg
[badge-downloads]: https://img.shields.io/npm/dt/shorten-uuid.svg
[npm]: https://www.npmjs.com/package/shorten-uuid

[badge-size]: https://img.shields.io/bundlephobia/minzip/shorten-uuid.svg
[bundlephobia]: https://bundlephobia.com/result?p=shorten-uuid

[badge-license]: https://img.shields.io/npm/l/shorten-uuid.svg
[license]: https://github.com/Cweili/shorten-uuid/blob/master/LICENSE

[badge-issues]: https://img.shields.io/github/issues/Cweili/shorten-uuid.svg
[github]: https://github.com/Cweili/shorten-uuid

[badge-build]: https://img.shields.io/github/actions/workflow/status/Cweili/shorten-uuid/ci.yml?branch=master
[workflows]: https://github.com/Cweili/shorten-uuid/actions/workflows/ci.yml?query=branch%3Amaster

[badge-coverage]: https://img.shields.io/coveralls/github/Cweili/shorten-uuid/master.svg
[coveralls]: https://coveralls.io/github/Cweili/shorten-uuid?branch=master
