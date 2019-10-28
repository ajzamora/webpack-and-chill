// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// $config: common config for development and production
let config = {
  context: __dirname,
    entry: './src/js/index.js',
    module: {
        rules: [
            // js loader
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-object-rest-spread'],
                },
              },
            },
            // css loader
            {
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
            },
        ],
    },
};



module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.output = {
      path: path.resolve(__dirname, "dev"),
      filename: "js/[name].js",
      chunkFilename: 'js/[id].bundle.js',
      publicPath: '../',
    };

    config.plugins = [
      new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    ];
  }

  else if (argv.mode === 'production') {
    config.output = {
      filename: "js/[name].[contentHash:11].js",
      path: path.resolve(__dirname, "dist"),
      chunkFilename: 'js/[id]bundle.js',
      publicPath: '../',
    };

    config.plugins = [
      new MiniCssExtractPlugin({ filename: "css/[name].[contentHash:11].css" }),
    ];
  }

  return config;
};
