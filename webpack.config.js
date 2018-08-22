const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // entry
  entry: './src/index.js',

  // loader
  module: {
    rules: [
      {
        enforce: 'pre', // 指定为前置类型，即在babel-laoder前执行
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader',
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        })
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ],
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          }
        ]
      },
    ],
  },

  // plugin
  plugins: [
    new UglifyPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'src/index.html' // 配置模板文件
    }),
    new ExtractTextPlugin('index.css'),
  ],

  // output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // 代码模块路径解析的配置
  resolve: {

    //  resolve.alias
    alias: {
      utils: path.resolve(__dirname, 'src/utils'),
      log$: path.resolve(__dirname, 'src/utils/log.js'), // 只匹配log
    },

    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".css"],

    mainFields: ["browser", "module", "main"],

    mainFiles: ["index"],
  }
}