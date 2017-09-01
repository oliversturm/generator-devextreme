const path = require('path');
const yt = require('yeoman-test');
const assert = require('yeoman-assert');
const glob = require('glob');

function assertOnlyFiles(expectedFiles) {
  const actualFiles = glob.sync('**', {
    nodir: true,
    dot: true
  });

  try {
    assert.deepEqual(new Set(expectedFiles), new Set(actualFiles));
  } catch (e) {
    // standard error message is useless, so:
    console.error('Expected files: ', expectedFiles);
    console.error('Actual files: ', actualFiles);

    throw e;
  }
}

describe('devextreme:app js', function() {
  describe('jquery', function() {
    describe('globalize', function() {
      describe('webpack', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              localization: 'globalize',
              bundling: 'webpack'
            })
            .then(() => {
              assertOnlyFiles([
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
              localization: 'globalize',
              bundling: 'webpack'
            })
            .then(() => {
              assertOnlyFiles([
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

      describe('usecdn', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              localization: 'globalize',
              bundling: 'usecdn'
            })
            .then(() => {
              assertOnlyFiles([
                'index.html',
                'index.js',
                'README.md',
                '.gitignore'
              ]);
              assert.fileContent('index.html', /cdnjs.*globalize/);
              assert.noFileContent('index.html', 'devextreme-intl');
              assert.noFileContent('index.html', 'dx.messages');
              done();
            });
        });

        it('locales de', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              locales: 'de',
              localization: 'globalize',
              bundling: 'usecdn'
            })
            .then(() => {
              assertOnlyFiles([
                'index.html',
                'index.js',
                'README.md',
                '.gitignore'
              ]);
              assert.fileContent('index.html', /cdnjs.*globalize/);
              assert.noFileContent('index.html', 'devextreme-intl');
              assert.fileContent('index.html', 'dx.messages.de.js');
              done();
            });
        });
      });
    });

    describe('intl', function() {
      describe('webpack', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              localization: 'intl',
              bundling: 'webpack'
            })
            .then(() => {
              assertOnlyFiles([
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
              localization: 'intl',
              bundling: 'webpack'
            })
            .then(() => {
              assertOnlyFiles([
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

      describe('usecdn', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              localization: 'intl',
              bundling: 'usecdn'
            })
            .then(() => {
              assertOnlyFiles([
                'index.html',
                'index.js',
                'README.md',
                '.gitignore'
              ]);
              assert.noFileContent('index.html', /cdnjs.*globalize/);
              assert.fileContent('index.html', 'devextreme-intl');
              assert.noFileContent('index.html', 'dx.messages');
              done();
            });
        });

        it('locales de', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['jquery'])
            .withOptions({
              locales: 'de',
              localization: 'intl',
              bundling: 'usecdn'
            })
            .then(() => {
              assertOnlyFiles([
                'index.html',
                'index.js',
                'README.md',
                '.gitignore'
              ]);
              assert.noFileContent('index.html', /cdnjs.*globalize/);
              assert.fileContent('index.html', 'devextreme-intl');
              assert.fileContent('index.html', 'dx.messages.de.js');
              done();
            });
        });
      });
    });
  });

  describe('knockout', function() {
    describe('globalize', function() {
      describe('webpack', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['knockout'])
            .withOptions({
              localization: 'globalize',
              bundling: 'webpack'
            })
            .then(() => {
              assertOnlyFiles([
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
              assert.fileContent('package.json', 'knockout');
              done();
            });
        });

        it('locales de', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['knockout'])
            .withOptions({
              locales: 'de',
              localization: 'globalize',
              bundling: 'webpack'
            })
            .then(() => {
              assertOnlyFiles([
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
              assert.fileContent('package.json', 'knockout');
              done();
            });
        });
      });

      describe('usecdn', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['knockout'])
            .withOptions({
              localization: 'globalize',
              bundling: 'usecdn'
            })
            .then(() => {
              assertOnlyFiles([
                'index.html',
                'index.js',
                'README.md',
                '.gitignore'
              ]);
              assert.fileContent('index.html', /cdnjs.*knockout/);
              assert.fileContent('index.html', /cdnjs.*globalize/);
              assert.noFileContent('index.html', 'devextreme-intl');
              assert.noFileContent('index.html', 'dx.messages');
              done();
            });
        });

        it('locales de', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['knockout'])
            .withOptions({
              locales: 'de',
              localization: 'globalize',
              bundling: 'usecdn'
            })
            .then(() => {
              assertOnlyFiles([
                'index.html',
                'index.js',
                'README.md',
                '.gitignore'
              ]);
              assert.fileContent('index.html', /cdnjs.*knockout/);
              assert.fileContent('index.html', /cdnjs.*globalize/);
              assert.noFileContent('index.html', 'devextreme-intl');
              assert.fileContent('index.html', 'dx.messages.de.js');
              done();
            });
        });
      });
    });

    describe('intl', function() {
      describe('webpack', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['knockout'])
            .withOptions({
              localization: 'intl',
              bundling: 'webpack'
            })
            .then(() => {
              assertOnlyFiles([
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
              assert.fileContent('package.json', 'knockout');
              assert.fileContent('package.json', 'devextreme-intl');
              done();
            });
        });

        it('locales de', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['knockout'])
            .withOptions({
              locales: 'de',
              localization: 'intl',
              bundling: 'webpack'
            })
            .then(() => {
              assertOnlyFiles([
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
              assert.fileContent('package.json', 'knockout');

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

      describe('usecdn', function() {
        it('default params', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['knockout'])
            .withOptions({
              localization: 'intl',
              bundling: 'usecdn'
            })
            .then(() => {
              assertOnlyFiles([
                'index.html',
                'index.js',
                'README.md',
                '.gitignore'
              ]);
              assert.fileContent('index.html', /cdnjs.*knockout/);
              assert.noFileContent('index.html', /cdnjs.*globalize/);
              assert.fileContent('index.html', 'devextreme-intl');
              assert.noFileContent('index.html', 'dx.messages');
              done();
            });
        });

        it('locales de', function(done) {
          yt
            .run(path.join(__dirname, '../generators/app'))
            .withArguments(['knockout'])
            .withOptions({
              locales: 'de',
              localization: 'intl',
              bundling: 'usecdn'
            })
            .then(() => {
              assertOnlyFiles([
                'index.html',
                'index.js',
                'README.md',
                '.gitignore'
              ]);
              assert.fileContent('index.html', /cdnjs.*knockout/);
              assert.noFileContent('index.html', /cdnjs.*globalize/);
              assert.fileContent('index.html', 'devextreme-intl');
              assert.fileContent('index.html', 'dx.messages.de.js');
              done();
            });
        });
      });
    });
  });
});

describe('devextreme:app ts', function() {
  describe('angular', function() {
    it('default params', function(done) {
      yt
        .run(path.join(__dirname, '../generators/app'))
        .withArguments(['angular'])
        .withOptions({
          localization: 'intl'
        })
        .then(() => {
          assertOnlyFiles([
            '.angular-cli.json',
            '.editorconfig',
            '.gitignore',
            'karma.conf.js',
            'package.json',
            'protractor.conf.js',
            'README.md',
            'tsconfig.json',
            'tslint.json',
            'e2e/app.e2e-spec.ts',
            'e2e/app.po.ts',
            'e2e/tsconfig.e2e.json',
            'src/favicon.ico',
            'src/index.html',
            'src/main.ts',
            'src/polyfills.ts',
            'src/styles.css',
            'src/test.ts',
            'src/tsconfig.app.json',
            'src/tsconfig.spec.json',
            'src/typings.d.ts',
            'src/app/app.component.css',
            'src/app/app.component.html',
            'src/app/app.component.spec.ts',
            'src/app/app.component.ts',
            'src/app/app.module.ts',
            'src/app/localization.ts',
            'src/assets/.gitkeep',
            'src/environments/environment.prod.ts',
            'src/environments/environment.ts'
          ]);
          assert.fileContent(
            'src/app/localization.ts',
            /import..devextreme-intl/
          );
          assert.noFileContent('src/app/localization.ts', 'locales');
          assert.fileContent(
            'src/app/app.module.ts',
            /import..\.\/localization/
          );

          assert.fileContent('package.json', 'devextreme-intl');
          done();
        });
    });
    it('locales de', function(done) {
      yt
        .run(path.join(__dirname, '../generators/app'))
        .withArguments(['angular'])
        .withOptions({
          localization: 'intl',
          locales: 'de'
        })
        .then(() => {
          assertOnlyFiles([
            '.angular-cli.json',
            '.editorconfig',
            '.gitignore',
            'karma.conf.js',
            'package.json',
            'protractor.conf.js',
            'README.md',
            'tsconfig.json',
            'tslint.json',
            'e2e/app.e2e-spec.ts',
            'e2e/app.po.ts',
            'e2e/tsconfig.e2e.json',
            'src/favicon.ico',
            'src/index.html',
            'src/main.ts',
            'src/polyfills.ts',
            'src/styles.css',
            'src/test.ts',
            'src/tsconfig.app.json',
            'src/tsconfig.spec.json',
            'src/typings.d.ts',
            'src/app/app.component.css',
            'src/app/app.component.html',
            'src/app/app.component.spec.ts',
            'src/app/app.component.ts',
            'src/app/app.module.ts',
            'src/app/localization.ts',
            'src/assets/.gitkeep',
            'src/environments/environment.prod.ts',
            'src/environments/environment.ts'
          ]);
          assert.fileContent(
            'src/app/localization.ts',
            /import..devextreme-intl/
          );
          assert.fileContent(
            'src/app/localization.ts',
            "const locales = ['en', 'de']"
          );
          assert.fileContent('src/app/localization.ts', 'navigator');
          assert.fileContent(
            'src/app/app.module.ts',
            /import..\.\/localization/
          );

          assert.fileContent('package.json', 'devextreme-intl');
          done();
        });
    });
  });
});
