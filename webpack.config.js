// webpack.config.js
const path = require('path');



// $config: common config for development and production
let config = {
  context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
    },
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

  }

  if (argv.mode === 'production') {

  }

  return config;
};
