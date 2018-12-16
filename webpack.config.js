const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const autoprefixerBrowser = ['last 10 versions', 'ie >= 9', 'Android >= 2.3', 'ios >= 7'];

module.exports = {
	mode: 'development',
	entry: './src/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	},
	devServer: {
		compress: true,
		port: 3000
	},
	module: {
		rules: [
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
								plugins: () => [autoprefixer(autoprefixerBrowser)]
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						},
					]
				})
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img/',
							publicPath: 'img/'
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png)$/i,
				use: [
					{
						loader: 'responsive-loader',
						options: {
							adapter: require('responsive-loader/sharp'),
							name: 'img/[name]-[width].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
};
