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

    this.option('localization', {
      desc: 'Include support for a globalization/localization library. One of globalize, intl. Use --no-localization to switch off.',
      default: 'globalize',
      type: this._oneOf(['globalize', 'intl'], 'globalize', true),
      alias: 'l'
    });

    this.option('packaging', {
      desc: 'Packaging to use for JavaScript files. One of webpack, usecdn.',
      type: this._oneOf(['webpack', 'usecdn'], 'webpack'),
      default: 'webpack',
      alias: 'p'
    });

    this.option('addlang', {
      desc: "Additional DevExtreme languages to load (other than 'en'). Comma-delimited.",
      default: undefined,
      alias: 'al',
      type: String
    });
  }

  _oneOf(options, defaultvalue, allowUndefined = false) {
    return fp.compose(
      v =>
        v
          ? options.find(o => v.toLowerCase() === o) ||
              options.find(o => o.startsWith(v.toLowerCase())) ||
              defaultvalue
          : allowUndefined ? undefined : defaultvalue,
      v => (v ? v.toLowerCase() : undefined),
      v => (typeof v === 'string' ? v : undefined)
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

  _writingjQuery() {
    this.fs.copy(
      this.templatePath('jquery/src/index.html'),
      this.destinationPath('src/index.html')
    );
    this.fs.copyTpl(
      this.templatePath('jquery/src/index.js'),
      this.destinationPath('src/index.js'),
      {
        localization: this.options.localization
      }
    );
  }

  writing() {
    return {
      jquery: this._writingjQuery.bind(this)
    }[this.options.apptype]();
  }

  method1() {
    this.log(`Appname is: ${this.appname}`);

    this.log(
      `Apptype: ${this.options.apptype}, localization: ${this.options.localization}, packaging: ${this.options.packaging}, addlang: ${this.options.addlang}`
    );
  }
};
