const path = require('path');
const yt = require('yeoman-test');
const assert = require('yeoman-assert');

describe('devextreme:app js', function() {
  describe('webpack', function() {
    describe('jquery', function() {
      it('default params', function(done) {
        yt
          .run(path.join(__dirname, '../generators/app'))
          .withArguments(['jquery'])
          .then(() => {
            assert.file([
              'src/index.html',
              'src/index.js',
              'README.md',
              'webpack.common.js',
              'webpack.dev.js',
              'webpack.prod.js',
              'package.json',
              '.gitignore'
            ]);
            assert.fileContent('src/index.js', /require..globalize/);
            assert.fileContent('webpack.common.js', /globalize: path.resolve/);
            assert.fileContent('package.json', 'cldr-data');
            assert.fileContent('package.json', 'globalize');
            done();
          });
      });

      it('addlang de', function(done) {
        yt
          .run(path.join(__dirname, '../generators/app'))
          .withArguments(['jquery'])
          .withOptions({
            addlang: 'de'
          })
          .then(() => {
            assert.file([
              'src/index.html',
              'src/index.js',
              'README.md',
              'webpack.common.js',
              'webpack.dev.js',
              'webpack.prod.js',
              'package.json',
              '.gitignore'
            ]);
            assert.fileContent('src/index.js', /require..globalize/);
            assert.fileContent(
              'src/index.js',
              'cldr-data/main/de/ca-gregorian.json'
            );
            assert.fileContent(
              'src/index.js',
              'devextreme/localization/messages/de.json'
            );
            assert.fileContent('src/index.js', 'locale(navigator');
            assert.fileContent('webpack.common.js', /globalize: path.resolve/);
            assert.fileContent('package.json', 'cldr-data');
            assert.fileContent('package.json', 'globalize');
            done();
          });
      });
    });
  });
});
