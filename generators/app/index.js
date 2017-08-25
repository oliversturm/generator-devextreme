const Generator = require('yeoman-generator');
const fp = require('lodash/fp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('apptype', {
      type: this._oneOf(['jquery', 'knockout', 'angular', 'react'], undefined),
      required: false,
      desc: 'The type of application project to create. One of jquery, knockout, angular, react.'
    });

    this.option('appname', {
      desc: `Override your application name. Defaults to current folder name.`,
      default: this.appname,
      type: String
    });

    this.option('globalize', {
      desc: 'Include support for Globalize. This option and --intl are mutually exclusive.',
      type: Boolean,
      default: true,
      alias: 'g'
    });

    this.option('intl', {
      desc: 'Include support for Intl. This option and --globalize are mutually exclusive.',
      type: Boolean,
      default: false,
      alias: 'i'
    });

    this.option('packaging', {
      desc: 'Packaging to use for JavaScript files. One of webpack, usecdn.',
      type: this._oneOf(['webpack', 'usecdn'], 'webpack'),
      default: 'webpack',
      alias: 'p'
    });

    this.option('languages', {
      desc: "Additional DevExtreme languages to load (other than 'en'). Comma-delimited.",
      default: undefined,
      alias: 'l',
      type: String
    });
  }

  _oneOf(options, defaultvalue) {
    return fp.compose(
      v =>
        options.find(o => v.toLowerCase() === o) ||
        options.find(o => o.startsWith(v.toLowerCase())) ||
        defaultvalue,
      v => v.toLowerCase()
    );
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

  method1() {
    this.log(`Appname is: ${this.appname}`);

    this.log(
      `Apptype: ${this.options.apptype}, globalize: ${this.options.globalize}, intl: ${this.options.intl}, packaging: ${this.options.packaging}`
    );
  }
};
