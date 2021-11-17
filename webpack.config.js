const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js'
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    mode: 'development',
    devServer: {
        compress: true,
        port: 8080,

        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true
          },
        },
      },

      plugins: [
        new HtmlWebpackPlugin({
            title: 'slider',
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
            },
          }),
          new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
          }),
          // new CopyPlugin({
          //   patterns: [
          //     { from: "src/static/img", to: "assets" },
          //     { from: "src/style.css", to: "style.css" }
          //   ],
          // }),
      ]
}