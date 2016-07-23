var path = require("path");
var fs = require("fs");


module.exports = {
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/public/",
    filename: "bundle.js"
  }
};