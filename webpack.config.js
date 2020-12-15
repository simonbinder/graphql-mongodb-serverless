// webpack.config.js
const webpack = require('webpack');
const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
require('dotenv').config();

module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    optimization: {
        minimize: false,
        concatenateModules: false
    },
    performance: {
        hints: false
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ '.js', '.jsx', '.json', '.ts', '.tsx' ]
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.pem$/i,
                use: 'raw-loader',
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.DOCUMENTDB_URL': JSON.stringify(process.env.DOCUMENTDB_URL),
            'process.env.DOCUMENTDB_USER': JSON.stringify(process.env.DOCUMENTDB_USER),
            'process.env.DOCUMENTDB_PASSWORD': JSON.stringify(process.env.DOCUMENTDB_PASSWORD),
        })
    ],
    output: {
        libraryTarget: "commonjs2",
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js",
        sourceMapFilename: "[file].map"
    },
    experiments: {
        topLevelAwait: true,
    },
};

