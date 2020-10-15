/**
 * node-mime-types
 *
 * A Node.js and zero-dependencies MIME type utility.
 *
 * Author: Adrien Valcke <adrienvalcke@icloud.com>
 *
 * - getMIMEType(filenameOrPath) -> String
 * - getExtension(mimeType) -> String or Array
 */
const { parse } = require('path');
const { is } = require('./object');
const mimetypesByExtension = require('./mimetypesByExtension');
const extensionsByMIMEType = require('./extensionsByMIMEType');

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

module.exports = Object.freeze({
  getMIMEType,
  getExtension,
});
