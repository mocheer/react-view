const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');//css-自动检测兼容性给各个浏览器加个内核前缀的插件
const version = require('./version.js')
const dir = __dirname //webpack执行路径
const env = process.env //webpack执行环境
var plugins = [
    new webpack.BannerPlugin(version),
    //保证编译后的代码永远是对的
    new webpack.NoErrorsPlugin(),

    // //相当于webpack -p
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // }),

    //html生成插件
    // new HtmlWebpackPlugin({}),

    //拆分插件
    // new webpack.optimize.CommonsChunkPlugin({}), 

    //维持构建编译代码
    // new webpack.optimize.OccurenceOrderPlugin(),
    
    //热替换,不用刷新页面，可用于生产环境 webpack-dev-server
    // new webpack.HotModuleReplacementPlugin(),

    // ProvidePlugin的作用就是在开发代码内不需要require('react')或import ... from ... 也能使用React
    // new webpack.ProvidePlugin({
    //     React: 'react',
    //     ReactDOM: 'react-dom'
    // }),
]

switch (env.task) {
    //开发环境
    case 'dev':
        break;
    //生产环境
    case 'build':
        plugins.push(
            //相当于webpack -p
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        )
        break;
}


module.exports = {
    entry: {
        // "react-view":'./src/ReactView.js',
        //  "controlbox": "./src/apps/ControlBox.js"
        "typhoon": "./src/apps/Typhoon.js",
       
    },
    output: {
        path: dir,
        //filename: 'examples/libs/js/[name].js'
        // filename:'../trunk-map/examples/libs/leaves/[name].js'
        filename:'../trunk-map/examples/libs/leaves/typhoon/[name].js'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
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
        postLoaders: [
            {
                test: /\.js(x)?$/,
                loaders: ['es3ify-loader']
            }
        ]
    },
    plugins: plugins
}
