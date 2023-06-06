<p align="center">
  <img src="docs/node-mime-types.png" alt="node-mime-types"/>
<p>

<p align="center">
  A Node.js and zero-dependencies MIME type utility.
<p>

# node-mime-types <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Presentation](#presentation)
- [Installation](#installation)
- [Technical information](#technical-information)
  - [Stack](#stack)
  - [Code quality](#code-quality)
  - [Tests](#tests)
  - [Security](#security)
- [Usage](#usage)
  - [Import module](#import-module)
  - [getExtension(mimeType)](#getextensionmimetype)
  - [getMIMEType(filenameOrPath)](#getmimetypefilenameorpath)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
  - [Format](#format)
  - [Linting](#linting)
  - [Automatically fixing linting](#automatically-fixing-linting)
  - [Test](#test)
  - [Build](#build)
- [Support](#support)
- [Security](#security-1)
- [License](#license)

## Presentation

This library is powered by [mime-db](https://github.com/jshttp/mime-db) data. It provides a very simple, lightweight, safe yet speed utility to deal with MIME types and file extensions.

Supports **[1180 file extensions](src/mimetypesByExtension.js)** and **[965 MIME types](src/extensionsByMIMEType.js)**.

## Installation

`npm install node-mime-types`

`npm i -S node-mime-types`

## Technical information

### Stack

- NodeJS >= 8.17.0
- NPM >=6.13.4

### Code quality

Code style follows [Airbnb JavaScript Best Practices](https://github.com/airbnb/javascript) using ESLint.

### Tests

Uses Mocha and Chai for unit testing.

### Security

- [Code security](https://docs.npmjs.com/packages-and-modules/securing-your-code) and most precisely module dependencies can be audited running `npm audit`.

## Usage

### Import module

```javascript
const mime = require('node-mime-types');

// mime is an object of functions
const {
  getExtension,
  getMIMEType,
} = require('node-mime-types');
```

*node-mime-types* module exports an object of functions. You'll find the complete list of functions below.

- `mime` **<Object\>** with the following functions.

### getExtension(mimeType)

Returns the file extension(s) based on the MIME type.

**Note**:

- if a MIME type does not exist or is unknown, the empty string is returned;
- if a MIME type has only one extension related to, a string is returned;
- if a MIME type corresponds to multiple extensions, an array is returned;
- supports MIME types in lower and upper case.
  - `mimeType` **<String\>**
  - Returns: **<String\>** | **<Array\>**  *Default*: `''`

<br/>

**Examples**:

```javascript
getExtension(); // ''
getExtension(false); // ''
getExtension(''); // ''
getExtension('application/unknown'); // ''

getExtension('application/json5'); // '.json5'
getExtension('application/rtf'); // '.rtf'

getExtension('text/plain'); // ['.txt', '.text', '.conf', '.def', '.list', '.log', '.in', '.ini']
getExtension('application/json'); // ['.json', '.map']

getExtension('IMAGE/PNG'); // '.png'
```

### getMIMEType(filenameOrPath)

Returns the MIME type based on the file name or path extension.

**Note**:

- if a file name or path is not a string or is the empty string, the empty string is returned;
- if a file name or path has no extension or an unknown extension, a default MIME type is returned;
- supports extensions in lower and upper case.
  - `filenameOrPath` **<String\>**
  - Returns: **<String\>**  *Default*: `application/octet-stream`

<br/>

**Examples**:

```javascript
getMIMEType(); // ''
getMIMEType([]); // ''
getMIMEType(''); // ''

getMIMEType('f'); // 'application/octet-stream'
getMIMEType('file.unknown'); // 'application/octet-stream'
getMIMEType('.js'); // 'application/octet-stream'

getMIMEType('file.html'); // 'text/html'
getMIMEType('file.css'); // 'text/css'
getMIMEType('/usr/file.json'); // 'application/json'
getMIMEType('/usr/file.json.txt'); // 'text/plain'
getMIMEType('C:\\file.JS'); // 'application/javascript'
getMIMEType('../../path/to/file-name.XML'); // 'text/xml'
getMIMEType('README.md'); // 'text/markdown'
```

## Code of Conduct

This project has a [Code of Conduct](.github/CODE_OF_CONDUCT.md). By interacting with this repository, organization, or community you agree to abide by its terms.

## Contributing

If you find any MIME type or file extension missing, please directly contribute to [mime-db](https://github.com/jshttp/mime-db).

Please take also a moment to read our [Contributing Guidelines](.github/CONTRIBUTING.md) if you haven't yet done so.

### Format

Uses `prettier` to format source code.

`npm run format`

### Linting

`npm run lint`

### Automatically fixing linting

`npm run lint:fix`

### Test

`npm test`

### Build

Extensions by MIME type and MIME types by extension files.

NOTE:

- will [format](#format) `src` right after building files;
- will [automatically fix linting](#automatically-fixing-linting).

`npm run build`

## Support

Please see our [Support](.github/SUPPORT.md) page if you have any questions or for any help needed.

## Security

For any security concerns or issues, please visit our [Security Policy](.github/SECURITY.md) page.

## License

[MIT](LICENSE.md).
