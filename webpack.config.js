const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: "development",
	entry: "./src/index.jsx",
	output: {
		path: path.resolve(__dirname, "docs"),
		filename: '[name].[hash].js',
	},
	devServer: { port: 3000 },
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /\.(jpeg|webp|jpg|png|svg)$/,
				use: [{
					loader: "file-loader",
					loader: 'img-optimize-loader',
					options: {
						compress: {
							// This will transform your png/jpg into webp.
							webp: true,
							disableOnDevelopment: true,
						},
					},
				}],
			},
			{
				test: /\.m?jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			favicon: "./src/img/toDoIco.png"
		}),
	],
};