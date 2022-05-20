const { expect } = require('./Common');
const lib = require('../src');

describe('#lib', function() {
  context('when requiring lib', function() {
    it('should return the expected function', function() {
      expect(lib.getMIMEType).to.be.a('function');
      expect(lib.getExtension).to.be.a('function');
    });
  });
});
