const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');//css-自动检测兼容性给各个浏览器加个内核前缀的插件
const version = require('./version.js')
var plugins = [
    new webpack.BannerPlugin(version),
    new webpack.NoErrorsPlugin(),//保证编译后的代码永远是对的
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),//相当于webpack -p
    // new webpack.optimize.OccurenceOrderPlugin(),//维持构建编译代码
    // new webpack.HotModuleReplacementPlugin(),//热替换,不用刷新页面，可用于生产环境 webpack-dev-server,轻量的express服务器
]
module.exports = {
    entry: {
        // "react-view":'./src/ReactView.js',
        "typhoon": "./apps/typhoon.js"
    },
    output: {
        path: __dirname,
        filename: '../trunk-map/examples/libs/leaves/typhoon/[name].js'//'examples/libs/js/[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules|bower_components)/,//npm,bower
                loader: 'babel-loader'
            }
        ],
        // postLoaders: [
        //     {
        //         test: /\.js(x)?$/,
        //         loaders: ['es3ify-loader']
        //     }
        // ]
    },
    plugins: plugins
}
