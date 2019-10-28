// webpack.config.js
const path = require('path');



// $config: common config for development and production
let config = {
  context: __dirname,
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
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
  }

  else if (argv.mode === 'production') {
    config.output = {
      filename: "js/[name].[contentHash:11].js",
      path: path.resolve(__dirname, "dist"),
      chunkFilename: 'js/[id]bundle.js',
      publicPath: '../',
    };
  }

  return config;
};
