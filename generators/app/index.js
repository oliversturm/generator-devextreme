const path = require('path');
const Generator = require('yeoman-generator');
const fp = require('lodash/fp');
const prettier = require('./prettier-transform');

const { stringOnly, toLowerCase, oneOf, fromCsv } = require('./optionHelpers');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

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
      default: 'globalize',
      type: oneOf(['globalize', 'intl'], 'globalize', true),
      alias: 'l'
    });

    this.option('packaging', {
      desc: 'Packaging to use for JavaScript files. One of webpack, usecdn.',
      type: oneOf(['webpack', 'usecdn'], 'webpack'),
      default: 'webpack',
      alias: 'p'
    });

    this.option('addlang', {
      desc: "Additional DevExtreme languages to load (other than 'en'). Comma-delimited.",
      default: undefined,
      type: fromCsv()
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

  _buildWritingConfig() {
    return {
      js: {
        webpack: {
          jquery: {
            files: ['src/index.html', 'src/index.js']
          }
        }
      }
    };
  }

  writing() {
    const that = this;

    this._buildWritingConfig()['js'][this.options.packaging][
      this.options.apptype
    ].files.forEach(f =>
      that.fs.copyTpl(
        that.templatePath(
          path.join('js', that.options.packaging, that.options.apptype, f)
        ),
        that.destinationPath(f),
        that.options
      )
    );
  }

  method1() {
    this.log(`Appname is: ${this.appname}`);

    this.log(
      `Apptype: ${this.options.apptype}, localization: ${this.options.localization}, packaging: ${this.options.packaging}, addlang: ${this.options.addlang}`
    );
  }
};
