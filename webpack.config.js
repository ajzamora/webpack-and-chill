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
const entryJS = {
  arrPages: commonPages, // Add more jsEntries: const arrPages = [...commonPages, addJSfiles]; or use ES6 .filter() to exclude
  path: './src/js/',

  config: function() {
    let configEntry = this.arrPages.map((page) =>
       ({[page]: `${this.path}${page}.js`})
    );
    return Object.assign({}, ...configEntry);
  }
};
const entryPug = {
  arrPages: commonPages, // Add more pugEntries: const arrPages = [...commonPages, addPugfiles]; or use ES6 .filter() to exclude
  path: `./src/html`,
  config: function(mode) {
    const isProd = mode == "production";
    return this.arrPages.map((page) =>
      new HtmlWebpackPlugin({
        filename: `html/${page}.html`,
        template: `./src/html/${page}.pug`,
        inject: true,
        chunks: [`${page}`],
        minify: {
          removeAttributeQuotes: isProd,
          collapseWhitespace: isProd,
          removeComments: isProd,
        },
      })
    )
  }
}

/************************************************
-- configured rules variables
************************************************/
const rules = {
  pugLoader(mode) {
    return {
      test: /\.pug$/,
      loader: 'pug-loader',
      options: { pretty: mode=="development" },
    }
  },
  fileLoaderImage(mode) {
    return {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: mode=="production" ? `[name].[contenthash:11].[ext]` : `[name].[ext]` ,
            outputPath: 'images',
          },
        },
      ],
    };
  },
  fileLoaderFont(mode) {
    return {
      test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: mode=="production"  ? `[name].[contenthash:11].[ext]` : `[name].[ext]`,
            outputPath: 'fonts',
            publicPath: '../fonts',
          },
        },
      ],
    };
  },
  babelLoader() {
    return {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread'],
        },
      },
    }
  },
  CSSloaders() {
    return {
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: (resourcePath, context) => {
              // publicPath is the relative path of the resource to the context
              // e.g. for ./css/admin/main.css the publicPath will be ../../
              // while for ./css/main.css the publicPath will be ../
              return path.relative(path.dirname(resourcePath), context) + '/';
            },
          }
        }, //3. Extract css into files
        // "style-loader", //3. Inject styles into DOM
        "css-loader", //2. Turns css into commonjs
        "sass-loader" //1. Turns sass into css
      ],
    }
  },
};
/************************************************
-- DEVELOPMENT & PRODUCTION common config
************************************************/
let config = {
  devtool: "none", // disables eval that webpack uses in js files (optional)
  context: __dirname,
    entry: entryJS.config(),
    module: {
        rules: [
          rules.babelLoader(),    // Babel: returns rules for babel
          rules.CSSloaders(),     // MiniCssExtractPlugin: uses MiniCssExtractPlugin.loader, css-loader, sass-loader
        ],
    },
};

module.exports = (env, argv) => {
  /************************************************
  -- MODE-based (production/development): dynamic config
  ************************************************/
  config.mode = argv.mode;

  config.module.rules.push(
    rules.pugLoader(config.mode),
    rules.fileLoaderImage(config.mode),
    rules.fileLoaderFont(config.mode)
  );

  const isProd = config.mode=="production";

  config.plugins = [
    new MiniCssExtractPlugin({ filename: isProd ? "css/[name].[contentHash:11].css" : "css/[name].css" }),
    ...entryPug.config(config.mode),
    new CleanWebpackPlugin(),
  ];

  config.output = {
    path: path.resolve(__dirname, isProd ? "dist" : "dev"),
    filename: isProd ? "js/[name].[contentHash:11].js" : "js/[name].js",
    chunkFilename: 'js/[id].bundle.js',
    publicPath: '../',
  };

  /************************************************
  -- DEVELOPMENT-specific config
  ************************************************/
  if (argv.mode === 'development') {
    config.optimization = {
      splitChunks: {chunks: 'async'},
    };
  }
  /************************************************
  -- PRODUCTION-specific config
  ************************************************/
  else if (argv.mode === 'production') {
    config.optimization = {
      splitChunks: {chunks: 'async'},
      minimizer: [
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin(),
      ],
    };
  }

  return config;
};
