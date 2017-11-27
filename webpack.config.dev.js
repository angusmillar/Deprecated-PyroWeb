const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${process.env.npm_package_config_host}:${process.env.npm_package_config_port}`,
        'webpack/hot/only-dev-server',
        './src/index.dev'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html', // Load a custom template
            inject: 'body' // Inject all scripts into the body
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
          })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })                
            },            
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|png|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
            },
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx'],
        alias: {
            '../../theme.config$': path.join(__dirname, 'semantic-theme/theme.config')  
        }
    }
};
