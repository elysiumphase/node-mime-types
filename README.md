<p align="center">
  <img src="docs/node-mime-types.png" alt="node-mime-types"/>
<p>

<p align="center">
  A Node.js and zero-dependencies MIME type utility.
<p>

# Table of Contents
- [Presentation](#presentation)
- [Installation](#installation)
- [Technical information](#technical-information)
  - [Node.js](#nodejs)
  - [Tests](#tests)
    - [Linting](#linting)
    - [Unit](#unit)
- [Usage](#usage)
  - [Import module](#import-module)
  - [getMIMEType(filenameOrPath)](#getmimetypefilenameorpath)
  - [getExtension(mimeType)](#getextensionmimetype)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
- [Support](#support)
- [Security](#security)
- [Licence](#licence)

# Presentation

This library is powered by [mime-db](https://github.com/jshttp/mime-db) data. It provides a very simple, lightweight, safe yet speed utility to deal with MIME types and file extensions.

Supports **[1163 extensions](lib/mimetypesByExtension.js)** and **[947 MIME types](lib/extensionsByMIMEType.js)**.

# Installation

`npm install node-mime-types`

`npm i -S node-mime-types`

# Technical information

## Node.js

- Language: JavaScript ES6/ES7
- VM: Node.js >= Carbon (8.17.0)

## Tests

Node.js >= Dubnium (10.22.1) could be required for some testing modules.

Command to run all tests:

`npm test`

### Linting

ESLint with Airbnb base rules. See  __<a href="https://github.com/airbnb/javascript" target="_blank">Airbnb JavaScript Style Guide</a>__.

`npm run test:lint`

### Unit

Mocha and Chai.

`npm run test:unit`

# Usage

## Import module

```javascript
const mime = require('node-mime-types');

// mime is an object of functions
const {
  getMIMEType,
  getExtension,
} = require('node-mime-types');
```

*node-mime-types* module exports an object of functions. You'll find the complete list of functions below.

- `mime` **<Object\>** with the following functions.

## getMIMEType(filenameOrPath)
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

## getExtension(mimeType)
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

# Code of Conduct
This project has a [Code of Conduct](.github/CODE_OF_CONDUCT.md). By interacting with this repository, organization, or community you agree to abide by its terms.

# Contributing
If you find any MIME type or file extension missing, please directly contribute to [mime-db](https://github.com/jshttp/mime-db).

Please take also a moment to read our [Contributing Guidelines](.github/CONTRIBUTING.md) if you haven't yet done so.

# Support
Please see our [Support](.github/SUPPORT.md) page if you have any questions or for any help needed.

# Security
For any security concerns or issues, please visit our [Security Policy](.github/SECURITY.md) page.

# Licence
[MIT](LICENSE.md).
