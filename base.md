const path = require('path');
const webpack = require('webpack');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
    new ExtractTextPlugin('[name].css'), // 配置单独css输出目录
    new webpack.DefinePlugin({
      TWO: '1+1',
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2'), // const CONSTANTS = { APP_VERSION: '1.1.2' }
      },
    }),
    new CopyWebpackPlugin([
      { from: 'assets/favicon.ico', to: 'favicon.ico', } // 配置复制文件的源路径与目标路径
    ]),
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
  },

  // 配置webpack-dev-server
  devServer: {
    port: '1234',  // 静态服务的端口
    // public: '',  // 指定静态服务的域名，默认是http://localhost:8080/
    // publicPath: 'http://localhost:8080/assets/', // 指定构建好的静态文件在浏览器上用什么路径访问，可用相对路径，可用这个URL
    // proxy: {
    //   '/api': {
    //     target: "http://localhost:3000", // 将URL中带有api的请求代理到本地的3000端口服务上
    //     pathRewrite: { '^/api': '' }, // 把URL中path部分的api移除掉
    //   }
    // },
    // contentBase: path.join(__dirname, "public"), // 配置提供额外的静态文件内容的目录，publicPath优先级高于contentBase
    before(app) {
      app.get('/some/path', function(req, res) { // 当访问/some/path路径，返回自定义的json数据
        res.json({ code: 200, message: 'hello world' });
      })
    }
  }
}