const path = require("path");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output filename
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              // minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new CssMinimizerWebpackPlugin(), new MiniCSSExtractPlugin()],
};
