const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: 'development',
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'dist')   
  },
  plugins: [   
    new webpack.DefinePlugin({
      DEPLOYED_ADDRESS: JSON.stringify(fs.readFileSync('deployedAddress', 'utf8').replace(/\n|\r/g, "")),
      DEPLOYED_ABI: fs.existsSync('deployedABI') && fs.readFileSync('deployedABI', 'utf8'),
      FRONT_ADDRESS: JSON.stringify(fs.readFileSync('deployedFrontAddress', 'utf8').replace(/\n|\r/g, "")),
      FRONT_ABI: fs.existsSync('deployedABI') && fs.readFileSync('deployedFrontABI', 'utf8'),
      PARSER_ADDRESS: JSON.stringify(fs.readFileSync('deployedParserAddress', 'utf8').replace(/\n|\r/g, "")),
      PARSER_ABI: fs.existsSync('deployedABI') && fs.readFileSync('deployedParserABI', 'utf8'),

      // SIGNATURE_ADDRESS: JSON.stringify(fs.readFileSync('SignatureAddress', 'utf8').replace(/\n|\r/g, "")),
      // SIGNATURE_ABI: fs.existsSync('SignatureABI') && fs.readFileSync('SignatureABI', 'utf8'),
    }),
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html"},{from: "./src/test.html", to: "test.html"}])
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true, host:'0.0.0.0' }
}