const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

function resolve(dir) {
    return path.join(__dirname, dir);
}
const IS_PROD = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'EP-CORE',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
    configureWebpack: config => {
        config.externals = [{
            'AMap': 'AMap'
        }]
        return {
            performance: {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000
            },
            optimization: {
                minimizer: [new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            drop_debugger: IS_PROD ? true : false,
                            drop_console: IS_PROD ? true : false,
                            pure_funcs: ['window.console.log', 'console.log']
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                })]
            },
            plugins: [new CompressionPlugin({
                test: productionGzipExtensions,
                threshold: 10240, //超过10K进行压缩
                deleteOriginalAssets: false //删除原文件
            })]
        }
    },
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            }),
            config.resolve.alias
                .set('assets', resolve('src/assets'))
                .set('components', resolve('src/components'))
                .set('utils', resolve('src/utils'))

    }
}