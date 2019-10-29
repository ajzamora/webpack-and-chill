<h1 align="center"> What's Included? </h1>
<p align="center">
  <a href="https://github.com/webpack/webpack">
      <img height="130" src="https://webpack.js.org/assets/icon-square-big.svg" alt="webpack">
  </a>
  <a href="https://pugjs.org">
    <img height="120" src="https://cdn.rawgit.com/pugjs/pug-logo/eec436cee8fd9d1726d7839cbe99d1f694692c0c/SVG/pug-final-logo-_-colour-128.svg" alt="pug">
  </a>

  <a href="https://babeljs.io/">
    <img height="90" alt="Babel" src="https://raw.githubusercontent.com/babel/logo/master/babel.png">
  </a>

  <a href="https://sass-lang.com">
    <img height="85" alt="Sass" src="https://rawgit.com/sass/sass-site/master/source/assets/img/logos/logo.svg" />
  </a>
</p>

<h4 align="center"> Write PugJS *(previously jade)*, SASS/SCSS, and ECMASCRIPT right off the bat. </h4>

<h2 align="center"> How to use it? Just hit this commands: </h2>

##### To install all your dependencies in package.json:
```
npm install
```
##### *this will download the tools webpack needs and put it in ./node_modules folder*
##### Development mode (run any of these):
``` script
npm run dev                 // build dev locally
npm run devw                // build dev locally, and watch for changes
npm run devwo               // build dev locally, watch for changes, and open the project in browser
```
##### *this will build your app in DEVELOPMENT mode and create it under ./dev folder*

##### Production mode:

##### *this will build your app in PRODUCTION mode and create it under ./dist folder*
###### with features such as:
- [x] *cache busting (hashing system)*
- [x] *refactoring codes instantly (uglify or minify)*
- [x] *chunking and bundling* --
- [x] *other plugins used for optimization: mini-css-extract-plugin, optimize-css-assets-webpack-plugin, clean-webpack-plugin*
- [x] *easier settings modification* (shown below)

```
/************************************************
-- WEBPACK CONFIG JS: variables / package imports
************************************************/
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

/************************************************
-- 1. ADD YOUR PAGES in commonPages; 2. (optional) : edit arrPages/path in entryJS and entryPug if needed
************************************************/
const commonPages = ['index', 'about'];
const entryJS = {...};
const entryPug = {...}

/************************************************
-- configured rules variables
************************************************/
const rules = {...};
/************************************************
-- DEVELOPMENT & PRODUCTION common config
************************************************/
let config = {...};
```

### PugJS
Pug is a high-performance template engine heavily influenced by [Haml](http://haml.info/)
 and implemented with JavaScript for [Node.js](http://nodejs.org) and browsers.

### Sass/Scss
Sass makes CSS fun again. Sass is an extension of CSS, adding nested rules,
variables, mixins, selector inheritance, and more. It's translated to
well-formatted, standard CSS using the command line tool or a plugin for your
build system.


### Babel
The compiler for writing next generation JavaScript.
Babel is a tool that helps you write code in the latest version of JavaScript. When your supported environments don't support certain features natively, Babel will help you compile those features down to a supported version.
