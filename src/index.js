/**
 * node-mime-types
 */
const { parse } = require('path');
const { is } = require('./object');
const mimetypesByExtension = require('./mimetypesByExtension');
const extensionsByMIMEType = require('./extensionsByMIMEType');

/**
 * @func getExtension
 *
 * Get file extension(s) by MIME type.
 *
 * @param  {String} mimeType
 * @return {String|Array}
 */
const getExtension = function getExtension(mimeType) {
  if (!is(String, mimeType)) {
    return '';
  }

  const extensions = extensionsByMIMEType[mimeType.toLowerCase()] || '';

  if (is(Array, extensions) && extensions.length === 1) {
    return extensions[0];
  }

  return extensions;
};

/**
 * @func getMIMEType
 *
 * Get MIME type from a file name or a path.
 *
 * @param  {String} filenameOrPath
 * @return {String}
 */
const getMIMEType = function getMIMEType(filenameOrPath) {
  const defaultMIMEType = 'application/octet-stream';

  if (!is(String, filenameOrPath) || filenameOrPath === '') {
    return '';
  }

  const { ext } = parse(filenameOrPath);

  if (!is(String, ext) || ext === '') {
    return defaultMIMEType;
  }

  return mimetypesByExtension[ext.toLowerCase()] || defaultMIMEType;
};

// exports
module.exports = Object.freeze({
  getExtension,
  getMIMEType,
});
