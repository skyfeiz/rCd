var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件

//定义路径
var rootPath = path.resolve(__dirname);
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var distPath = path.resolve(rootPath,'rootCloud');

module.exports = {
    entry: {
        charts:'./src/components/charts.js',
    },
    output: {
        path: distPath,
        filename: "js/[name][hash].js",
        publicPath: '/rootCloud/'
    },
    devServer:{
        hot:true,
        inline:true,
        port:3000
    },
    module:{
        loaders:[{
            test:/\.js$/,
            loader:'babel-loader',
            exclude:nodeModulesPath,
            include:path.resolve(rootPath,'./src/'),
            query:{
                presets:['es2015']
            }
        },{
            test:/\.(png|jpg|gif|svg|ttf)$/i,
            loader:'file-loader?name=[path]/[name].[ext]&context=src/',
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/debug'),
            to: path.resolve(__dirname,'rootCloud/debug')
        },{
            from: path.resolve(__dirname, 'src/libs'),
            to: path.resolve(__dirname,'rootCloud/libs')
        },{
            from: path.resolve(__dirname, 'src/css'),
            to: path.resolve(__dirname,'rootCloud/css')
        },{
            from: path.resolve(__dirname, 'src/imgs'),
            to: path.resolve(__dirname,'rootCloud/imgs')
        },{
            from: path.resolve(__dirname, 'src/js'),
            to: path.resolve(__dirname,'rootCloud/js')
        }]),
        new htmlWebpackPlugin({
            filename:'p1.html',
            template:path.resolve(__dirname,'./src/p1.html'),
            chunks:['charts'],
            inject:'head',
            title:'智能服务'
        }),
        new htmlWebpackPlugin({
            filename:'p2.html',
            template:path.resolve(__dirname,'./src/p2.html'),
            inject:'head',
            chunks:['charts'],
            title:'延长保修'
        }),
        new htmlWebpackPlugin({
            filename:'p3.html',
            template:path.resolve(__dirname,'./src/p3.html'),
            inject:'head',
            chunks:['charts'],
            title:'模式创新'
        }),
        new htmlWebpackPlugin({
            filename:'p4.html',
            template:path.resolve(__dirname,'./src/p4.html'),
            inject:'head',
            chunks:['charts'],
            title:'研发辅助'
        })
    ]
};
