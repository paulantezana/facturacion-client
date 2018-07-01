const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const path                  = require('path');

module.exports = {
    entry:{
        index        : './src/index.js',
    },

    output: {
        path        : path.resolve(__dirname,'public'),
        filename    : 'scripts/[name].js',
    },

    devServer: {
        contentBase : path.join(__dirname, "public"),
        historyApiFallback: true,
        compress    : true,
        port        : 3000,
        open        : true,
        stats       : 'errors-only',
    },

    module: {
        rules:[
            {
                test: /\.variables.scss$/,
                loader: 'babel-loader!postcss-variables-loader'
            },
            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use : ['css-loader','postcss-loader']
                })
            },
            {
                test    : /\.(scss)/,
                exclude: /\.variables.scss$/,
                use     : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use : [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 2,
                                localIdentName: '[local]__[hash:base64:5]'
                            },
                        },
                        'sass-loader',
                    ]
                })
            },

            {
                test    : /\.(js|jsx?)$/,
                exclude : /node_modules/,
                use     : 'babel-loader'
            },

            // {
            //     test    : /\.json$/,
            //     use     : 'json-loader'
            // },

            {
                test    : /\.pug$/,
                use     : ['html-loader','pug-html-loader']
            },

            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            },

            {
                test    : /\.(png|jpg|svg)$/,
                use     : 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename    : 'index.html',
            minify      : {
                collapseWhitespace: false
            },
            hash        : true,
            template    : './src/index.pug',
        }),

        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: false
        }),
    ]
}
