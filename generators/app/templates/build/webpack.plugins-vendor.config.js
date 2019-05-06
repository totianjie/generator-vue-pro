/**
 * @Author: mikey.TIANJIE
 * @Date: 2018/8/6
 * @remark: 插件及第三方库分开打包
 * */
const path = require("path");
const webpack = require("webpack");

module.exports = {
    // 你想要打包的模块的数组
    entry: {
        'plugins-vendor': ['./src/js/plugins/echarhs.config.js']
    },
    output: {
        path: path.join(__dirname, '../static/plugins'), // 打包后文件输出的位置
        filename: '[name].min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
