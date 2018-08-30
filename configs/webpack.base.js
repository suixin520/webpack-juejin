const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
    ],
  },

  // 代码模块路径解析的配置
  resolve: {

    //  resolve.alias
    alias: {
      utils: path.resolve(__dirname, '../src/utils'),
      log$: path.resolve(__dirname, '../src/utils/log.js'), // 只匹配log
    },

    modules: [
      "node_modules",
      path.resolve(__dirname, '../src')
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".css"],

    mainFields: ["browser", "module", "main"],

    mainFiles: ["index"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    })
  ]
}