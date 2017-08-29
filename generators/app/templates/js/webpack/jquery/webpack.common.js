const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['env']
                  }
              }
          },
          {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: ['file-loader']
          },
          {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: ['file-loader']
          },
          {
              test: /\.html$/,
              loader: 'html-loader'
          }
      ]
  },
<% if (localization === 'globalize') { %>
  resolve: {
    alias: {
      globalize$: path.resolve(
        __dirname,
        'node_modules/globalize/dist/globalize.js'
      ),
      globalize: path.resolve(
        __dirname,
        'node_modules/globalize/dist/globalize'
      ),
      cldr$: path.resolve(__dirname, 'node_modules/cldrjs/dist/cldr.js'),
      cldr: path.resolve(__dirname, 'node_modules/cldrjs/dist/cldr')
    }
  },
<% } %>
  plugins: [
    new CleanWebpackPlugin(['dist']),  
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
<% if (localization === 'globalize') { -%>,        
    new webpack.ContextReplacementPlugin(
      /cldr-data\/main/,
      /^\.\/(en<% if (locales) locales.forEach(function (l) { %>|<%- l %><% }); %>)\/(ca-gregorian|numbers|currencies)\.json$/
    )
<% } %>    
<% if (localization && locales && locales.length) { -%>,
    new webpack.ContextReplacementPlugin(
      /devextreme\/localization\/messages/,
      /^\.\/(<% locales.forEach(function (l, i) { if (i > 0) { %>|<% } %><%- l %><% }); %>)\.json$/
    )
<% } %>            
  ]
};
