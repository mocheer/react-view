var webpack = require('webpack');  
module.exports = {
    entry: {
        // "react-view":'./src/ReactView.js',
        "TideForecast":"./apps/TideForecast.js"
    },
    output: {
        path: __dirname,
        filename: 'examples/js/[name].js'
    },
    resolve: {
        extensions: ['','.js', '.jsx']
    },
    module: {
       loaders: [
            {
                 test: /\.js(x)?$/,
                 exclude: /(node_modules|bower_components)/,//npm,bower
                 loader: 'babel-loader'
            }
        ],
        postLoaders: [
            {
                test: /\.js(x)?$/,
                loaders: ['es3ify-loader']
            }
        ]
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),//维持构建编译代码
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),//相当于webpack -p
        // new webpack.HotModuleReplacementPlugin(),//热替换,不用刷新页面，可用于生产环境
        new webpack.NoErrorsPlugin()//保证编译后的代码永远是对的
    ]
}

