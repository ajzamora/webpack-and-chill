// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



// $config: common config for development and production
let config = {
  context: __dirname,
    entry: {
      index: './src/js/index.js',
      about: './src/js/about.js',
    },
    module: {
        rules: [
            // file loader (fonts)
            {
              test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: `[name].[ext]`,
                    outputPath: 'fonts',
                    publicPath: '../fonts',
                  },
                },
              ],
            },
            // file loader (images)
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: `[name].[ext]` ,
                    outputPath: 'images',
                  },
                },
              ],
            },
            // ecmascript/js transpiler/loader
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
            // sass, scss, css loader
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
            // html/pug loader
            {
              test: /\.pug$/,
              loader: 'pug-loader',
              options: { pretty: true, },
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
      new HtmlWebpackPlugin({
        filename: `html/index.html`,
        template: `./src/html/index.pug`,
        inject: true,
        chunks: [`index`],
        minify: {
          removeAttributeQuotes: false,
          collapseWhitespace: false,
          removeComments: false,
        }
      }),
      new HtmlWebpackPlugin({
        filename: `html/about.html`,
        template: `./src/html/about.pug`,
        inject: true,
        chunks: [`about`],
        minify: {
          removeAttributeQuotes: false,
          collapseWhitespace: false,
          removeComments: false,
        }
      }),
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
      new HtmlWebpackPlugin({
        filename: `html/index.html`,
        template: `./src/html/index.pug`,
        inject: true,
        chunks: [`index`],
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        }
      }),
      new HtmlWebpackPlugin({
        filename: `html/about.html`,
        template: `./src/html/about.pug`,
        inject: true,
        chunks: [`about`],
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        }
      }),
    ];
  }

  return config;
};
