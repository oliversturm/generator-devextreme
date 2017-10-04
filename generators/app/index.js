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

    this.option('appname', {
      desc: `Override your application name. Defaults to current folder name.`,
      default: this.appname,
      type: String
    });

    this.argument('apptype', {
      type: oneOf(['jquery', 'knockout', 'angular', 'react'], undefined),
      required: false,
      desc:
        'The type of application project to create. One of jquery, knockout, angular, react.'
    });

    this.option('localization', {
      desc:
        'Include support for a globalization/localization library. One of globalize, intl. Use --no-localization to switch off.',
      default: 'intl',
      type: oneOf(['globalize', 'intl'], 'intl', true)
    });

    this.option('locales', {
      desc: "Additional locales to load (other than 'en'). Comma-delimited.",
      default: undefined,
      type: fromCsv()
    });

    this.option('bundling', {
      desc:
        'Bundling to use for JavaScript files. One of webpack, usecdn, angular-cli (default for Angular).',
      type: oneOf(['webpack', 'usecdn', 'angular-cli'], 'webpack'),
      default: 'webpack'
    });

    this.option('language', {
      desc:
        'Programming language for the project. One of js, ts (default for Angular).',
      type: oneOf(['js', 'ts'], 'js'),
      default: 'js'
    });

    this.option('prompts', {
      desc: 'Show prompts for all options',
      type: Boolean,
      default: false,
      alias: 'p'
    });
  }

  _buildPrompts() {
    return [
      {
        name: 'appname',
        message: 'Application name',
        type: 'input',
        default: this.options.appname,
        when: () => this.options.prompts
      },
      {
        name: 'apptype',
        message: 'Application type:',
        type: 'list',
        default: this.options.apptype || 'jquery',
        when: () => !this.options.apptype || this.options.prompts,
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
      },
      {
        name: 'localization',
        message: 'Localization library:',
        type: 'list',
        default: this.options.localization,
        when: () => this.options.prompts,
        choices: [
          {
            name: 'Intl',
            value: 'intl',
            short: 'i'
          },
          {
            name: 'Globalize',
            value: 'globalize',
            short: 'g'
          },
          {
            name: 'None',
            value: undefined,
            short: 'n'
          }
        ]
      },
      {
        name: 'locales',
        message:
          "Locales to support other than 'en' (use comma-separated list, for instance: de,ja,en-GB)",
        when: () => this.options.prompts,
        default: this.options.locales,
        type: 'input',
        filter: fromCsv()
      },
      {
        name: 'bundling',
        message: 'Bundling system',
        when: a => a.apptype !== 'angular' && this.options.prompts,
        default: this.options.bundling,
        type: 'list',
        choices: [
          {
            name: 'Webpack',
            value: 'webpack',
            short: 'w'
          },
          {
            name: 'Use CDN URLs (no bundling)',
            value: 'usecdn',
            short: 'c'
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
        message:
          "Don't know how to build Angular project with Globalize. Using Intl instead.",
        fix: o => (o.localization = 'intl')
      },
      {
        failCond: o => o.apptype === 'angular' && o.bundling === 'webpack',
        fix: o => (o.bundling = 'angular-cli')
      },
      {
        failCond: o => o.apptype === 'angular' && o.language !== 'ts',
        fix: o => (o.language = 'ts')
      },
      {
        failCond: o => o.apptype !== 'angular' && o.language !== 'js',
        message:
          'Supporting only js as programming language for this project. Reverting.',
        fix: o => (o.language = 'js')
      },
      {
        failCond: o => o.apptype === 'angular' && o.bundling === 'usecdn',
        message:
          'Supporting only angular-cli to package this project. Reverting.',
        fix: o => (o.bundling = 'angular-cli')
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

    this.options.printoptions = JSON.stringify(
      this.options,
      ['appname', 'apptype', 'localization', 'locales', 'bundling', 'language'],
      2
    );
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
                source: 'src/localization.js',
                when: o => o.localization
              },
              'README.md',
              'webpack.common.js',
              'webpack.dev.js',
              'webpack.prod.js',
              'package.json',
              {
                source: 'gitignore',
                target: '.gitignore'
              }
            ]
          },
          knockout: {
            files: [
              'src/index.html',
              'src/index.js',
              {
                source: 'src/localization.js',
                when: o => o.localization
              },
              'README.md',
              'webpack.common.js',
              'webpack.dev.js',
              'webpack.prod.js',
              'package.json',
              {
                source: 'gitignore',
                target: '.gitignore'
              }
            ]
          }
        },
        usecdn: {
          jquery: {
            files: [
              'index.html',
              'index.js',
              'README.md',
              {
                source: 'gitignore',
                target: '.gitignore'
              }
            ]
          },
          knockout: {
            files: [
              'index.html',
              'index.js',
              'README.md',
              {
                source: 'gitignore',
                target: '.gitignore'
              }
            ]
          }
        }
      },
      ts: {
        'angular-cli': {
          angular: {
            files: [
              '.angular-cli.json',
              '.editorconfig',
              {
                source: 'gitignore',
                target: '.gitignore'
              },
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
                source: 'src/app/localization.ts',
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

  _getWritingConfig(language, bundling, apptype) {
    return [language, bundling, apptype].reduce((r, v) => {
      if (r[v]) return r[v];
      else {
        this.log.error(
          `Can't find templates for this combination of language=${language}, bundling=${bundling} and apptype=${apptype}. Sorry, this case must have slipped by.`
        );
        this.env.error('Exiting due to unexpected invalid option combination.');
      }
    }, this._buildWritingConfig());
  }

  writing() {
    const wrapFile = fi =>
      typeof fi === 'string'
        ? {
            source: fi
          }
        : fi;

    const getFileConditionally = fi =>
      fi.when ? (fi.when.bind(this)(this.options) ? fi : undefined) : fi;

    const copyFile = (fi =>
      fi &&
      this.fs.copyTpl(
        this.templatePath(
          path.join(
            this.options.language,
            this.options.bundling,
            this.options.apptype,
            fi.source
          )
        ),
        this.destinationPath(fi.target || fi.source),
        this.options
      )).bind(this);

    const copyFileConditionally = fp.compose(
      copyFile,
      getFileConditionally,
      wrapFile
    );

    this._getWritingConfig(
      this.options.language,
      this.options.bundling,
      this.options.apptype
    ).files.forEach(copyFileConditionally);
  }
};
