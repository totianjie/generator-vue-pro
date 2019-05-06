'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const buildConfig = require('../src/buildConfig');

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')}
            ]
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? {warnings: false, errors: true}
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: buildConfig.title,
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            scripts: `
                <!--<script src="https://cdn.bootcss.com/echarts/4.1.0/echarts.min.js"></script>-->
                <!--<script src="https://cdn.bootcss.com/vue/2.5.2/vue.min.js"></script>-->
                <!--<script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>-->
                <!--<script src="https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js"></script>-->
                <!--<script src="https://cdn.bootcss.com/three.js/92/three.min.js"></script>-->
                <!--<script src="./../static/js/echarts.min.js"></script>-->
                <script src="./static/plugins/plugins-vendor.min.js"></script>
                <script src="./static/js/vue.min.js"></script>
                <script src="./static/plugins/element_ui/element-ui.min.js"></script>
                <script src="./static/js/vue-router.min.js"></script>
                <script src="./static/js/vuex.min.js"></script>
            `,
            styles: `
                <link rel="stylesheet" href="./static/plugins/element_ui/element-ui.min.css">
            `
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
    // TODO 只是用来做测试
    // externals: {
    //     'vue': 'Vue',
    //     'vue-router': 'VueRouter',
    //     'vuex': 'Vuex',
    //     /*'echarts': 'echarts',*/
    // }
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }));

            resolve(devWebpackConfig);
        }
    });
});
