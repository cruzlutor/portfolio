const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractSass = new ExtractTextPlugin('main.css')

module.exports = {

  entry: ['./src/main.js'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /(node_modules)/, 
        loader: 'babel-loader', 
      }, {
        test: /\.sass$/,
        use: extractSass.extract([ 'css-loader', 'sass-loader' ])
      }, {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },

  plugins: [
    extractSass
  ],

  devServer: {
    disableHostCheck: true,
    publicPath: "/dist/",
    host : '0.0.0.0',
    port: 9090,
    proxy: {
      "/": "http://localhost:3000"
    }
  }
}