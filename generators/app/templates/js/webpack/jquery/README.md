# DevExtreme with Webpack and jQuery

This starter project has been created by [generator-devextreme](https://github.com/oliversturm/generator-devextreme) and includes [jQuery](https://jquery.com/) and [DevExtreme](https://js.devexpress.com/) widgets. 

These options were used to generate the project:

```
<%- printoptions %>
```

Based on the options, localization support has <% if (localization === 'globalize') { %>been included on the basis of [Globalize](https://github.com/globalizejs/globalize)<% } else if (localization === 'intl') { %>been included on the basis of [Intl](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl) and the [DevExtreme-Intl](https://github.com/DevExpress/DevExtreme-Intl) library<% } else {%>not been included<% } %>. <% if(locales && locales.length) {%>In addition to the language files for the 'en' locale, which are included by default, the following locales have also been added: <%- locales.join(', ') %>.<% } else { %>No language files apart from those for the standard 'en' locale have been added.<% } %>

## Running the project

Install dependencies:

```shell
npm install
```

Run the development web server:

```shell
npm start
```

## Building for production

A build script is provided to build with the production configuration in `webpack.prod.js`:

```shell
npm run build
```

