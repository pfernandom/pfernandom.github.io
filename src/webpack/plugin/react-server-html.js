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
		template: "../index.html",
		url:"https://pfernandom.github.io/"
	},options);
}

ReactServerHTMLPlugin.prototype.apply = function(compiler){
	var self = this;

	compiler.plugin("emit", function(compilation, callback) {
		if (compilation.assets[self.options.template]) {

			var html = compilation.assets[self.options.template].source();
			var dom = new JSDOM(html, {
				url: self.options.url,
				runScripts: "dangerously",
				resources: "usable"
			});

			var originalDom = new JSDOM(html);

			dom.window.document.addEventListener('DOMContentLoaded', (ev) => {
				setTimeout(()=>{
					originalDom.window.document.querySelector("#app").innerHTML = dom.window.document.querySelector("#app").innerHTML

					var html = originalDom.serialize();
					compilation.assets[self.options.template] = {
						source: function () {
							return html;
						},
						size: function () {
							return html.length;
						}
					};
					callback()
				},1000);

			}, false);
		}
		else{
			callback();
		}

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