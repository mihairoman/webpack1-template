const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    context: __dirname,
    watch: true,
    //define entry point
    entry: './src/js/app.js',
    //define output point
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "jshint-loader"
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            exclude: /node_modules/,
            //include: path.join(__dirname, 'assets/img'),
            loaders: [
                'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'file-loader?name=[name].[ext]!extract-loader!html-loader'
        }, {
            test: /\.sass$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
        }]
    },
    devtool: '#source-map',
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
}
