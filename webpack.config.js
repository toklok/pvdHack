var path = require("path");
var fs = require("fs");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/public/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      } ,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: JSON.parse(
        fs.readFileSync(path.join(__dirname, ".babelrc"), {encoding: "utf8"})
        )
      }
    ]
  }
};
