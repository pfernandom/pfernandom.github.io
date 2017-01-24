var webpack = require("webpack");
var config = require('config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
var fs = require("fs")

//var jsxLoader = (config.get('env') === 'development') ? 'react-hot!babel!es2015' : 'babel!es2015';
//console.log("Loader "+jsxLoader)
var configuration = {
	//watch:true,
	devtool: 'inline-eval-cheap-source-map',
	//entry:'./src/entry.js',
	entry: {
		main: ['./src/entry.js'],
		vendor: ['react', 'react-dom', 'react-redux', 'redux'],
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
	},
	devServer: {
		contentBase: __dirname,
		historyApiFallback: {
			index: 'index.html'
		},
		setup: function(app) {
			app.get('/json/data.json', function(req, res) {
				var file = fs.readFileSync('./json/data.json', 'utf8');
				res.json(JSON.parse(file));
			});
		},
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ["babel-loader"],
			},
			{
				test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&minetype=application/font-woff"
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader"
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
				loader: 'file-loader'
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		new webpack.optimize.CommonsChunkPlugin(
			/* chunkName= */"vendor",
			/* filename= */"vendor.bundle.js"
		),
		new HtmlWebpackPlugin({
			title: 'Scallywag',
			template: 'index.html.tmpl',
			hash:true,
			filename: '../index.html',
			favicon: './dist/icons/favicon.ico'
		}),
		new FaviconsWebpackPlugin({
			logo:'./src/images/pumpkin.svg',
			prefix: 'icons/',
			persistentCache: true,
			inject: false,
			title: 'Webpack App',
			icons: {
			  android: false,
			  appleIcon: false,
			  appleStartup: false,
			  coast: false,
			  favicons: true,
			  firefox: false,
			  opengraph: false,
			  twitter: false,
			  yandex: false,
			  windows: false
			}
		})
	]
}

/*
 if (config.env === 'development') {
 configuration.entry.main.unshift(
 'webpack/hot/dev-server'//,
 //'webpack-hot-middleware/client'
 );
 configuration.plugins.push(new webpack.HotModuleReplacementPlugin());
 }
 */
module.exports = configuration;