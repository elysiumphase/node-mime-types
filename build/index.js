const { writeFileSync } = require('fs');
const { join } = require('path');
/* eslint import/no-extraneous-dependencies: "off" */
const db = require('mime-db');

const mimetypesByExtension = {};
const extensionsByMIMEType = {};

Object.keys(db).forEach((mime) => {
  if (db[mime].extensions !== undefined && Array.isArray(db[mime].extensions)) {
    extensionsByMIMEType[mime] = [];

    db[mime].extensions.forEach((extension) => {
      mimetypesByExtension[`.${extension}`] = mime;
      extensionsByMIMEType[mime].push(`.${extension}`);
    });
  }
});

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

writeFileSync(join(__dirname, './mimetypesByExtension.json'), JSON.stringify(mimetypesByExtensionSorted, null, 2));
writeFileSync(join(__dirname, './extensionsByMIMEType.json'), JSON.stringify(extensionsByMIMETypeSorted, null, 0));
writeFileSync(join(__dirname, './build.json'), JSON.stringify({ built_at: new Date().toISOString() }, null, 2));

console.info('successfully built files');
