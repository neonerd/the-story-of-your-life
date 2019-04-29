const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackPluginOpts = {
    title: 'S Project',
    template: 'src/client/index.ejs'
}

const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/client/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginOpts),
    new CopyPlugin([
        {from: 'res', to: 'res'},
        {from: 'vendor', to: 'vendor'}
    ])
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};