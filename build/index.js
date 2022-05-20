const { writeFileSync } = require('fs');
const { join } = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const { template } = require('lodash');
const db = require('mime-db');
/* eslint-enable import/no-extraneous-dependencies */
const { devDependencies } = require('../package.json');

const getTemplate = (title) => `/**
 * ${title}
 *
 * generated on ${new Date().toISOString()} with mime-db v${
  devDependencies['mime-db']
}
 */
module.exports = Object.freeze(<%= data %>);`;
const mimetypesByExtension = {};
const extensionsByMIMEType = {};

console.info('building files...');

// build extensions and MIME types object
Object.keys(db).forEach((mime) => {
  if (db[mime].extensions !== undefined && Array.isArray(db[mime].extensions)) {
    extensionsByMIMEType[mime] = [];

    db[mime].extensions.forEach((extension) => {
      mimetypesByExtension[`.${extension}`] = mime;
      extensionsByMIMEType[mime].push(`.${extension}`);
    });
  }
});

// sort extensions and MIME types keys and rebuild objects
const mimetypesByExtensionSorted = {};
const extensionsByMIMETypeSorted = {};
const extensionsSorted = Object.keys(mimetypesByExtension).sort();
const mimeTypesSorted = Object.keys(extensionsByMIMEType).sort();

extensionsSorted.forEach((extension) => {
  mimetypesByExtensionSorted[extension] = mimetypesByExtension[extension];
});

mimeTypesSorted.forEach((mime) => {
  extensionsByMIMETypeSorted[mime] = extensionsByMIMEType[mime];
});

// write files
writeFileSync(
  join(__dirname, '../src/mimetypesByExtension.js'),
  template(getTemplate(`${Object.keys(mimetypesByExtensionSorted).length} extensions and their related mime type`))({
    data: JSON.stringify(mimetypesByExtensionSorted, null, 2),
  }),
);

writeFileSync(
  join(__dirname, '../src/extensionsByMIMEType.js'),
  template(getTemplate(`${Object.keys(extensionsByMIMETypeSorted).length} mime types and their related extension(s)`))({
    data: JSON.stringify(extensionsByMIMETypeSorted, null, 0),
  }),
);

console.info('successfully built files');
