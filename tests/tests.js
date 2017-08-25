const path = require('path');
const yt = require('yeoman-test');

describe('devextreme:app', function() {
  it('accepts apptype as an argument', function() {
    yt
      .run(path.join(__dirname, '../generators/app'))
      .withArguments(['knockout'])
      .then(function() {});
  });
});
