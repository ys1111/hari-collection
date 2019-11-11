const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
      './src/index.tsx', './src/stylesheets/index.scss'
  ],
  module: {
    rules: [
        {
            test: /\.tsx$/,
            use: [{
                loader: 'ts-loader',
                options: {
                  configFile: "tsconfig.json"
                }
            }]
        },
        {
            test: /\.ts$/,
            use: [{
                loader: 'awesome-typescript-loader',
            }]
        },
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'sorce-map-loader',
                options: {
                    enforce: 'pre'
                }
            }]
        },
        {
          test: /\.scss/,
          loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
        },
    ],
  },
  plugins: [
        new ExtractTextPlugin("bundle.css")
  ],
  resolve: {
      modules: [
          "node_modules",
          path.resolve('./src'),
      ],
      extensions: ['.tsx', '.js', '.ts', 'json', 'scss']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: "source-map",
  devServer: {
    contentBase: './dist'
  }
};