const { expect } = require('./Common');
const { getMIMEType, getExtension } = require('../lib');

// based on: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
const commonMIMETypesByExtension = {
  '.aac':	'audio/x-aac',
  '.abw': 'application/x-abiword',
  '.arc': 'application/x-freearc',
  '.avi': 'video/x-msvideo',
  '.azw': 'application/vnd.amazon.ebook',
  '.bin': 'application/octet-stream',
  '.bmp': 'image/x-ms-bmp',
  '.bz': 'application/x-bzip',
  '.bz2': 'application/x-bzip2',
  '.csh': 'application/x-csh',
  '.css': 'text/css',
  '.csv': 'text/csv',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.eot': 'application/vnd.ms-fontobject',
  '.epub': 'application/epub+zip',
  '.gz': 'application/gzip',
  '.gif': 'image/gif',
  '.htm': 'text/html',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.ics': 'text/calendar',
  '.jar': 'application/java-archive',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.jsonld': 'application/ld+json',
  '.md': 'text/markdown',
  '.mid': 'audio/midi',
  '.midi': 'audio/midi',
  '.mjs': 'application/javascript',
  '.mp3': 'audio/mpeg',
  '.mpeg': 'video/mpeg',
  '.mpkg': 'application/vnd.apple.installer+xml',
  '.odp': 'application/vnd.oasis.opendocument.presentation',
  '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
  '.odt': 'application/vnd.oasis.opendocument.text',
  '.oga': 'audio/ogg',
  '.ogv': 'video/ogg',
  '.ogx': 'application/ogg',
  '.otf': 'font/otf',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.php': 'application/x-httpd-php',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.rar': 'application/x-rar-compressed',
  '.rtf': 'text/rtf',
  '.sh': 'application/x-sh',
  '.svg': 'image/svg+xml',
  '.swf': 'application/x-shockwave-flash',
  '.tar': 'application/x-tar',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.ts': 'video/mp2t',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.vsd': 'application/vnd.visio',
  '.wav': 'audio/x-wav',
  '.weba': 'audio/webm',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xhtml': 'application/xhtml+xml',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xml': 'text/xml',
  '.xul': 'application/vnd.mozilla.xul+xml',
  '.zip': 'application/zip',
  '.3gp': 'video/3gpp',
  '.3g2': 'video/3gpp2',
  '.7z': 'application/x-7z-compressed',
};

describe('#index', function() {
  context('when using getMIMEType', function() {
    it('should return the empty string if file name or path is not a string or the empty string', function() {
      expect(getMIMEType()).to.be.a('string').and.to.equal('');
      expect(getMIMEType(5)).to.be.a('string').and.to.equal('');
      expect(getMIMEType(true)).to.be.a('string').and.to.equal('');
      expect(getMIMEType(false)).to.be.a('string').and.to.equal('');
      expect(getMIMEType(new Error('error'))).to.be.a('string').and.to.equal('');
      expect(getMIMEType([])).to.be.a('string').and.to.equal('');
      expect(getMIMEType({})).to.be.a('string').and.to.equal('');
      expect(getMIMEType('')).to.be.a('string').and.to.equal('');
    });

    it('should return the default MIME type if file name or path has no extension', function() {
      expect(getMIMEType('test')).to.be.a('string').and.to.equal('application/octet-stream');
      expect(getMIMEType('string')).to.be.a('string').and.to.equal('application/octet-stream');
      expect(getMIMEType('/usr/path')).to.be.a('string').and.to.equal('application/octet-stream');
      expect(getMIMEType('C:\\file')).to.be.a('string').and.to.equal('application/octet-stream');
    });

    it('should return the default MIME type if file base name starts with .', function() {
      expect(getMIMEType('.test')).to.be.a('string').and.to.equal('application/octet-stream');
      expect(getMIMEType('.js')).to.be.a('string').and.to.equal('application/octet-stream');
      expect(getMIMEType('.css')).to.be.a('string').and.to.equal('application/octet-stream');
      expect(getMIMEType('.github')).to.be.a('string').and.to.equal('application/octet-stream');
    });

    it('should return the default MIME type if file name or path has an unknown extension', function() {
      expect(getMIMEType('file.unknown')).to.be.a('string').and.to.equal('application/octet-stream');
      expect(getMIMEType('file......')).to.be.a('string').and.to.equal('application/octet-stream');
      expect(getMIMEType('file.$')).to.be.a('string').and.to.equal('application/octet-stream');
    });

    it('should return the expected MIME type if file name or path has an extension in lowercase', function() {
      expect(getMIMEType('file.html')).to.be.a('string').and.to.equal('text/html');
      expect(getMIMEType('/usr/file.json')).to.be.a('string').and.to.equal('application/json');
      expect(getMIMEType('/usr/file.json.txt')).to.be.a('string').and.to.equal('text/plain');
      expect(getMIMEType('C:\\file.js')).to.be.a('string').and.to.equal('application/javascript');
      expect(getMIMEType('../../path/to/file-name.xml')).to.be.a('string').and.to.equal('text/xml');

      Object.keys(commonMIMETypesByExtension).forEach((extension) => {
        expect(getMIMEType(`file${extension}`)).to.be.a('string').and.to.equal(commonMIMETypesByExtension[extension]);
      });
    });

    it('should return the expected MIME type if file name or path has an extension in uppercase', function() {
      expect(getMIMEType('file.HTML')).to.be.a('string').and.to.equal('text/html');
      expect(getMIMEType('/usr/file.JSON')).to.be.a('string').and.to.equal('application/json');
      expect(getMIMEType('/usr/file.JSON.TXT')).to.be.a('string').and.to.equal('text/plain');
      expect(getMIMEType('C:\\file.JS')).to.be.a('string').and.to.equal('application/javascript');
      expect(getMIMEType('../../path/to/file-name.XML')).to.be.a('string').and.to.equal('text/xml');

      Object.keys(commonMIMETypesByExtension).forEach((extension) => {
        expect(getMIMEType(`file${extension.toUpperCase()}`)).to.be.a('string').and.to.equal(commonMIMETypesByExtension[extension]);
      });
    });
  });

  context('when using getExtension', function() {
    it('should return the empty string if MIME type is not a string', function() {
      expect(getExtension()).to.be.a('string').and.to.equal('');
      expect(getExtension(5)).to.be.a('string').and.to.equal('');
      expect(getExtension(true)).to.be.a('string').and.to.equal('');
      expect(getExtension(false)).to.be.a('string').and.to.equal('');
      expect(getExtension(new Error('error'))).to.be.a('string').and.to.equal('');
      expect(getExtension([])).to.be.a('string').and.to.equal('');
      expect(getExtension({})).to.be.a('string').and.to.equal('');
    });

    it('should return the empty string if MIME type is unknown', function() {
      expect(getExtension('application/unknown')).to.be.a('string').and.to.equal('');
      expect(getExtension('unknown')).to.be.a('string').and.to.equal('');
      expect(getExtension('')).to.be.a('string').and.to.equal('');
      expect(getExtension('application')).to.be.a('string').and.to.equal('');
    });

    it('should return the expected extension as a string if MIME type corresponds to one extension', function() {
      expect(getExtension('application/json5')).to.be.a('string').and.to.equal('.json5');
      expect(getExtension('application/rtf')).to.be.a('string').and.to.equal('.rtf');
    });

    it('should return the expected extension as an array if MIME type corresponds to multiple extensions', function() {
      expect(getExtension('application/json')).to.be.an('array').and.to.eql(['.json', '.map']);
      expect(getExtension('application/octet-stream')).to.be.an('array').and.to.eql(['.bin', '.dms', '.lrf', '.mar', '.so', '.dist', '.distz', '.pkg', '.bpk', '.dump', '.elc', '.deploy', '.exe', '.dll', '.deb', '.dmg', '.iso', '.img', '.msi', '.msp', '.msm', '.buffer']);
    });

    it('should return the expected extension if MIME type is in lowercase', function() {
      expect(getExtension('application/json5')).to.be.a('string').and.to.equal('.json5');
      expect(getExtension('image/png')).to.be.a('string').and.to.equal('.png');
    });

    it('should return the expected extension if MIME type is in uppercase', function() {
      expect(getExtension('application/JSON5')).to.be.a('string').and.to.equal('.json5');
      expect(getExtension('APPLICATION/JSON5')).to.be.a('string').and.to.equal('.json5');
      expect(getExtension('IMAGE/png')).to.be.a('string').and.to.equal('.png');
      expect(getExtension('IMAGE/PNG')).to.be.a('string').and.to.equal('.png');
    });

    it('should return the expected extension', function() {
      Object.keys(commonMIMETypesByExtension).forEach((extension) => {
        const ext = getExtension(commonMIMETypesByExtension[extension]);

        if (Array.isArray(ext)) {
          expect(ext).to.be.an('array').and.to.include(extension);
        } else {
          expect(ext).to.be.a('string').and.to.equal(extension);
        }
      });
    });
  });
});
