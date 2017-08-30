const path = require('path');
const yt = require('yeoman-test');
const assert = require('yeoman-assert');

describe('devextreme:app js', function() {
  describe('webpack', function() {
    describe('globalize', function() {
      describe('jquery', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              localization: 'globalize'
            })
            .then(() => {
              assert.file([
                'src/index.html',
                'src/index.js',
                'src/localization.js',
                'README.md',
                'webpack.common.js',
                'webpack.dev.js',
                'webpack.prod.js',
                'package.json',
                '.gitignore'
              ]);
              assert.fileContent('src/localization.js', /require..globalize/);
              assert.fileContent(
                'webpack.common.js',
                /globalize: path.resolve/
              );
              assert.fileContent('package.json', 'cldr-data');
              assert.fileContent('package.json', 'globalize');
              done();
            });
        });

        it('locales de', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              locales: 'de',
              localization: 'globalize'
            })
            .then(() => {
              assert.file([
                'src/index.html',
                'src/index.js',
                'src/localization.js',
                'README.md',
                'webpack.common.js',
                'webpack.dev.js',
                'webpack.prod.js',
                'package.json',
                '.gitignore'
              ]);
              assert.fileContent('src/localization.js', /require..globalize/);
              assert.fileContent('src/localization.js', 'cldr-data/main/');
              assert.fileContent(
                'src/localization.js',
                "locales = ['en', 'de']"
              );
              assert.fileContent('src/localization.js', 'navigator.language');
              assert.fileContent(
                'webpack.common.js',
                /globalize: path.resolve/
              );
              assert.fileContent('package.json', 'cldr-data');
              assert.fileContent('package.json', 'globalize');
              done();
            });
        });
      });
    });

    describe('intl', function() {
      describe('jquery', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              localization: 'intl'
            })
            .then(() => {
              assert.file([
                'src/index.html',
                'src/index.js',
                'src/localization.js',
                'README.md',
                'webpack.common.js',
                'webpack.dev.js',
                'webpack.prod.js',
                'package.json',
                '.gitignore'
              ]);
              assert.fileContent(
                'src/localization.js',
                /require..devextreme-intl/
              );
              assert.noFileContent('src/localization.js', 'lobalize');
              assert.noFileContent(
                'webpack.common.js',
                /globalize: path.resolve/
              );
              assert.noFileContent('package.json', 'cldr-data');
              assert.noFileContent('package.json', 'globalize');
              assert.fileContent('package.json', 'devextreme-intl');
              done();
            });
        });

        it('locales de', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              locales: 'de',
              localization: 'intl'
            })
            .then(() => {
              assert.file([
                'src/index.html',
                'src/index.js',
                'src/localization.js',
                'README.md',
                'webpack.common.js',
                'webpack.dev.js',
                'webpack.prod.js',
                'package.json',
                '.gitignore'
              ]);
              assert.fileContent(
                'src/localization.js',
                /require..devextreme-intl/
              );
              assert.noFileContent('src/localization.js', 'lobalize');
              assert.noFileContent(
                'webpack.common.js',
                /globalize: path.resolve/
              );
              assert.noFileContent('package.json', 'cldr-data');
              assert.noFileContent('package.json', 'globalize');
              assert.fileContent('package.json', 'devextreme-intl');

              assert.noFileContent('src/localization.js', 'cldr-data');
              assert.fileContent(
                'src/localization.js',
                "locales = ['en', 'de']"
              );
              assert.fileContent('src/localization.js', 'navigator.language');
              done();
            });
        });
      });
    });
  });
});
