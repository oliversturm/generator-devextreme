const path = require('path');
const Generator = require('yeoman-generator');
const fp = require('lodash/fp');
const prettier = require('./prettier-transform');

const { stringOnly, toLowerCase, oneOf, fromCsv } = require('./optionHelpers');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Whyever yeoman replaces the dashes in my appname with spaces,
    // I don't know. At least for my use of appname this doesn't make sense.
    this.appname = this.appname.replace(/\s+/g, '-');

    this.registerTransformStream(prettier());

    this.argument('apptype', {
      type: oneOf(['jquery', 'knockout', 'angular', 'react'], undefined),
      required: false,
      desc: 'The type of application project to create. One of jquery, knockout, angular, react.'
    });

    this.option('appname', {
      desc: `Override your application name. Defaults to current folder name.`,
      default: this.appname,
      type: String
    });

    this.option('localization', {
      desc: 'Include support for a globalization/localization library. One of globalize, intl. Use --no-localization to switch off.',
      default: 'intl',
      type: oneOf(['globalize', 'intl'], 'intl', true),
      alias: 'l'
    });

    this.option('packaging', {
      desc: 'Packaging to use for JavaScript files. One of webpack, usecdn, angular-cli (default for Angular).',
      type: oneOf(['webpack', 'usecdn', 'angular-cli'], 'webpack'),
      default: 'webpack',
      alias: 'p'
    });

    this.option('locales', {
      desc: "Additional locales to load (other than 'en'). Comma-delimited.",
      default: undefined,
      type: fromCsv()
    });

    this.option('language', {
      desc: 'Programming language for the project. One of js, ts (default for Angular).',
      type: oneOf(['js', 'ts'], 'js'),
      default: 'js'
    });
  }

  _buildPrompts() {
    return [
      {
        name: 'apptype',
        message: 'Which application type would you like to create?',
        type: 'list',
        default: 'jquery',
        when: () => !this.options.apptype,
        choices: [
          {
            name: 'jQuery',
            value: 'jquery',
            short: 'j'
          },
          {
            name: 'Knockout',
            value: 'knockout',
            short: 'k'
          },
          {
            name: 'Angular',
            value: 'angular',
            short: 'a'
          },
          {
            name: 'React',
            value: 'react',
            short: 'r'
          }
        ]
      }
    ];
  }

  prompting() {
    return this.prompt(this._buildPrompts()).then(
      function(answers) {
        Object.assign(this.options, answers);
      }.bind(this)
    );
  }

  _buildOptionRules() {
    return [
      {
        failCond: o =>
          o.apptype === 'angular' && o.localization === 'globalize',
        message: "Don't know how to build Angular project with Globalize. Using Intl instead.",
        fix: o => (o.localization = 'intl')
      },
      {
        failCond: o => o.apptype === 'angular' && o.packaging === 'webpack',
        fix: o => (o.packaging = 'angular-cli')
      },
      {
        failCond: o => o.apptype === 'angular' && o.language !== 'ts',
        fix: o => (o.language = 'ts')
      },
      {
        failCond: o => o.apptype !== 'angular' && o.language !== 'js',
        message: 'Supporting only js as programming language for this project. Reverting.',
        fix: o => (o.language = 'js')
      },
      {
        failCond: o => o.apptype === 'angular' && o.packaging === 'usecdn',
        message: 'Supporting only angular-cli to package this project. Reverting.',
        fix: o => (o.packaging = 'angular-cli')
      }
    ];
  }

  configuring() {
    for (const rule of this._buildOptionRules()) {
      if (rule.failCond.bind(this)(this.options)) {
        if (rule.message) this.log.error(rule.message);
        if (rule.fix) rule.fix.bind(this)(this.options);
        else {
          this.log.error("Can't fix. Exiting.");
          this.env.error('Exiting due to rule failure.');
        }
      }
    }
  }

  _buildWritingConfig() {
    return {
      js: {
        webpack: {
          jquery: {
            files: [
              'src/index.html',
              'src/index.js',
              {
                file: 'src/localization.js',
                when: o => o.localization
              },
              'README.md',
              'webpack.common.js',
              'webpack.dev.js',
              'webpack.prod.js',
              'package.json',
              '.gitignore'
            ]
          },
          knockout: {
            files: [
              'src/index.html',
              'src/index.js',
              {
                file: 'src/localization.js',
                when: o => o.localization
              },
              'README.md',
              'webpack.common.js',
              'webpack.dev.js',
              'webpack.prod.js',
              'package.json',
              '.gitignore'
            ]
          }
        },
        usecdn: {
          jquery: {
            files: ['index.html', 'index.js', 'README.md', '.gitignore']
          },
          knockout: {
            files: ['index.html', 'index.js', 'README.md', '.gitignore']
          }
        }
      },
      ts: {
        'angular-cli': {
          angular: {
            files: [
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
              {
                file: 'src/app/localization.ts',
                when: o => o.localization
              },
              'src/assets/.gitkeep',
              'src/environments/environment.prod.ts',
              'src/environments/environment.ts'
            ]
          }
        }
      }
    };
  }

  _getWritingConfig(language, packaging, apptype) {
    return [language, packaging, apptype].reduce((r, v) => {
      if (r[v]) return r[v];
      else {
        this.log.error(
          `Can't find templates for this combination of language=${language}, packaging=${packaging} and apptype=${apptype}. Sorry, this case must have slipped by.`
        );
        this.env.error('Exiting due to unexpected invalid option combination.');
      }
    }, this._buildWritingConfig());
  }

  writing() {
    const that = this;

    const getFileConditionally = fi =>
      typeof fi === 'string'
        ? fi
        : fi.when.bind(this)(this.options) ? fi.file : undefined;
    const copyFile = (f =>
      f &&
      this.fs.copyTpl(
        this.templatePath(
          path.join(
            this.options.language,
            this.options.packaging,
            this.options.apptype,
            f
          )
        ),
        this.destinationPath(f),
        this.options
      )).bind(this);
    const copyFileConditionally = fp.compose(copyFile, getFileConditionally);

    this._getWritingConfig(
      this.options.language,
      this.options.packaging,
      this.options.apptype
    ).files.forEach(copyFileConditionally);
  }
};
