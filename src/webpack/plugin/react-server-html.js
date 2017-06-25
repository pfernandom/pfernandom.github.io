/**
 * Created by pedro.f.marquez.soto on 6/23/2017.
 */

var path = require('path');
var fs = require('fs')
var babel = require('babel-core');
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('jsdom-global')()
const jsdom = require("jsdom");
const { JSDOM } = jsdom;



function ReactServerHTMLPlugin(options){
	this.options = Object.assign({
		template:"index.html.tmpl",
		entry: "./dist/main.js",
		vendor: "./dist/vendor.bundle.js",
		template: "./index.html"
	},options);
}

ReactServerHTMLPlugin.prototype.apply = function(compiler){
	var self = this;

	self.options.template = this.getFullTemplatePath(this.options.template, compiler.context);
	self.options.entry = this.getFullTemplatePath(this.options.entry, compiler.context);
	self.options.template = this.getFullTemplatePath(this.options.template, compiler.context);

	var vendor = fs.readFileSync(this.options.vendor, 'utf8');
	var entry = fs.readFileSync(this.options.entry, 'utf8');
	var template = fs.readFileSync(this.options.template, 'utf8');

	compiler.plugin("emit", function(compilation, callback) {
		//console.log(compilation.options)
		//console.log(compilation.assets['../index.html'].source())
		/*
		compilation.options.plugins.forEach(p =>{
			console.log(p instanceof HtmlWebpackPlugin)
		})*/
		var dom = new JSDOM(compilation.assets['../index.html'].source(), {runScripts: "dangerously",resources: "usable"});
		dom.window.document.addEventListener('DOMContentLoaded', (ev)=>{
			console.log(dom.window.document.querySelector("#app").innerHTML);
			var html = dom.serialize();
			compilation.assets['../index.html'] = {
				source: function () {
					return html;
				},
				size: function () {
					return html.length;
				}
			};
			callback()

			/*
			 fs.writeFile(self.options.template, dom.serialize(), 'utf8', function (err) {
			 if (err) return console.log(err);
			 callback()
			 });
			 */

		}, false);


	});
}


ReactServerHTMLPlugin.prototype.getFullTemplatePath = function (template, context) {
	// If the template doesn't use a loader use the lodash template loader
	if (template.indexOf('!') === -1) {
		template = path.resolve(context, template);
	}
	// Resolve template path
	return template.replace(
		/([!])([^/\\][^!?]+|[^/\\!?])($|\?[^!?\n]+$)/,
		function (match, prefix, filepath, postfix) {
			return prefix + path.resolve(filepath) + postfix;
		});
};

ReactServerHTMLPlugin.prototype.isHotUpdateCompilation = function (assets) {
	return assets.js.length && assets.js.every(function (name) {
			return /\.hot-update\.js$/.test(name);
		});
};


module.exports = ReactServerHTMLPlugin;