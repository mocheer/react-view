/**
 * @author gyb(mocheer)
 * @email mocheer@foxmail.com  
 * @since 2017.4.10
 */
const webpack = require('webpack');
const assistant = require('assistant-webpack')
// const autoprefixer = require('autoprefixer');//css-自动检测兼容性给各个浏览器加个内核前缀的插件
const dir = __dirname
const env = process.env
const packageJSON = assistant.PackageJSON;
// plugins
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const BannerPlugin = webpack.BannerPlugin
const NoErrorsPlugin = webpack.NoErrorsPlugin
const DefinePlugin = webpack.DefinePlugin
const ProvidePlugin = webpack.ProvidePlugin
// const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin //热替换,不用刷新页面，可用于生产环境 webpack-dev-server
// const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin    //维持构建编译代码
// const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin        //拆分插件
//
var plugins = [
    new BannerPlugin(packageJSON.toBanner()),
    new NoErrorsPlugin(),
    // new ProvidePlugin({
    //     React: 'react',
    //     ReactDOM: 'react-dom'
    // }),
    new DefinePlugin({
        'process.env': {
            'NODE_ENV': '"production"'
        }
    }),
]
//
switch (env.task) {
    //开发环境
    case 'dev':
        break;
    //生产环境
    case 'build':
        plugins.push(
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        )
        break;
}
module.exports = {
    entry: {
        'react-view': './index.js'
    },
    output: {
        path: dir,
        filename: 'dist/[name].js'
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom'
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
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: plugins
}
