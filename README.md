# A Yeoman generator for DevExtreme projects

*generator-devextreme* creates new projects that utilize [DevExtreme](https://js.devexpress.com) widgets, targeting jQuery, Knockout and Angular.

## Requirements

You need Yeoman, more specifically the [yo command](https://github.com/yeoman/yo), which is based on [Node.js](https://nodejs.org/en/) (I recommend using [nvm](https://github.com/creationix/nvm)). Assuming you have Node installed, making *yo* available globally on your system requires only this command:

```shell
npm install -g yo
```

## Installation

To install *generator-devextreme*, run another *npm* command:

```shell
npm install -g generator-devextreme
```

## Usage

Start by creating a folder for your project and changing into it. The generator will create files and sub-folders within the current folder.

```shell
mkdir MyCoolProject
cd MyCoolProject
```

The generator is written to assume a number of defaults and not to ask a lot of questions. Typically, you would pass the type of application project you want to create on the command line, and possibly specify some options to override defaults:

```shell
yo devextreme jquery
```

This generates a jQuery based project with DevExtreme widget integration, Intl localization support and Webpack bundling.

```shell
yo devextreme knockout --bundling usecdn --localization globalize --locales de,ja,en-GB
```

This generates a Knockout based project with DevExtreme widget integration, Globalize localization support with extra locales 'de', 'ja' and 'en-GB' loaded, using CDN URLs to load libraries (and no bundling).

If you prefer using prompts to define the various parameters instead of passing command line options, try running the generator like this:

```shell
yo devextreme --prompts
```

### Project types

These are the supported project types:

| Name | Description | 
| --- | --- |
| `jquery` | [jQuery](https://jquery.com/) based project |
| `knockout` | [Knockout](http://knockoutjs.com/) based project, using a view model bound to the DevExtreme widgets |
| `angular` | [Angular](https://angular.io/) based project, utilizing the integration provided with the DevExtreme widgets. This project is based on [Angular CLI](https://cli.angular.io/) version 1.3.2. |

### Options

Options are passed with a preceding `--`, e.g. `--localization` or `--bundling`. Alternatively, when using `--prompts`, prompts are shown to query all parameters.

| Name | Default | Description | 
| --- | --- | --- | 
| `localization` | intl | One of *intl* and *globalize*. See general information about localizing DevExtreme in [my recent blog post](https://community.devexpress.com/blogs/oliver/archive/2017/08/25/localizing-devextreme.aspx). For *angular* projects, only *intl* is currently supported. | 
| `no-localization` | n/a | Don't integrate any localization library. | 
| `locales` | none | Additional locales, other than the standard *en*, to load language data for. DevExtreme currently supports *ru* (Russian), *ja* (Japanese) and *de* (German) out of the box. When using *Globalize*, the given locales are also used to load number formats, calendar and currency information. This can be important for locales like *en-GB*, which can use *en* language but requires its own formats. The parameter must be given as a comma-separated list, e.g. `de, ja, en-GB` (use quotes when passing spaces on the command line, spaces and quotes are optional).|
| `bundling` | See description | One of *webpack*, *usecdn* and *angular-cli*. **For *angular* type projects, the only supported and default bundling type is *angular-cli*** (*angular-cli* is only supported for *angular* type projects.). **For project types other than *angular*, the default is *webpack*.** This generates a project that uses [Webpack](https://webpack.js.org/) to build a bundle, including [Babel](https://babeljs.io/) integration. *usecdn* creates a project without bundling or any other build steps, where required libraries are loaded via `script` tags in HTML. |
| `prompts` | false | Show prompts to query the application name, the project type, and the other options described in this table. |

### Using the resulting projects

Information can be found in the *README.md* file included in each generated project, please be sure to check there for up-to-date details. Here's the gist:

#### CDN based *jquery* and *knockout* projects

Simply open the file `index.html` in a browser

#### Webpack based *jquery* and *knockout* projects

Install dependencies:

```shell
npm install
```

Run the development web server:

```shell
npm start
```

#### Type *angular* projects

Install dependencies:

```shell
npm install
```

Run the development web server, making sure to use the project-specific version of `ng`:

```shell
node_modules/.bin/ng serve

** alternatively:
npm start
```

Navigate to http://localhost:4200 in a browser.

Note that [additional commands](https://github.com/angular/angular-cli/wiki#additional-commands) based on Angular CLI also work. Please see the README.md in your generated Angular project for a few details on executing `ng`.

## Sample repositories

If you would like to browse examples of the projects created by this generator, please find the links in the table below. Note that all projects were created with the option `--locales de,ja,en-GB`.

| Type | Localization | Bundling | Link |
| --- | --- | --- | --- |
| `jquery` | `intl` | `webpack` | [Repository](https://github.com/oliversturm/demo-generator-devextreme-jquery-intl-webpack) |
|  |  | `usecdn` | [Repository](https://github.com/oliversturm/demo-generator-devextreme-jquery-intl-usecdn) |
|  | `globalize` | `webpack` | [Repository](https://github.com/oliversturm/demo-generator-devextreme-jquery-globalize-webpack) |
|  |  | `usecdn` | [Repository](https://github.com/oliversturm/demo-generator-devextreme-jquery-globalize-usecdn) |
| `knockout` | `intl` | `webpack` | [Repository](https://github.com/oliversturm/demo-generator-devextreme-knockout-intl-webpack) |
|  |  | `usecdn` | [Repository](https://github.com/oliversturm/demo-generator-devextreme-knockout-intl-usecdn) |
|  | `globalize` | `webpack` | [Repository](https://github.com/oliversturm/demo-generator-devextreme-knockout-globalize-webpack) |
|  |  | `usecdn` | [Repository](https://github.com/oliversturm/demo-generator-devextreme-knockout-globalize-usecdn) |
| `angular` | `intl` | `angular-cli` | [Repository](https://github.com/oliversturm/demo-generator-devextreme-angular) |


## Future Plans

* Add JSZip integration, required for client-side export features in some widgets
* Add support for ASP.NET MVC projects
* Add support for React projects
* (Continuous) Add support for new project types supported by DevExtreme
