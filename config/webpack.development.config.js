const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');

const config = {
    mode: 'development',
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                // namedExport: true, case 1;
                                namedExport: false,
                            },
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        open: true,
        hot: true,
        compress: true,
    },
};

module.exports = merge(baseConfig, config);
