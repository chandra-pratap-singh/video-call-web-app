const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output filename
  },
};
