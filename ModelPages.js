var Utils = require('./utils');

function ModelPages(page, conf) {

	this.query = this.qs = conf.query = conf.qs = Utils.Url.query;
	this.page = page;
	conf.pageName = this.page;
	conf.originPageName = this.originPageName = location.pathname.replace(/.+\/(\w+)\.\w+$/, '$1').toLowerCase();
	conf.http = this.http = function () {
		var o = {};
		['get', 'post'].forEach(m => {
			o[m] = function () {
				return $[m].apply(null, arguments);
			}
		});
		return o;
	}();
	this.conf = conf;
	Object.assign(this, conf);
}

ModelPages.prototype = {
	dispatch: function (fn) {
		$('body').attr('data-class') && $('body').attr('data-class').toLowerCase() == this.page.toLowerCase() && fn.call(this, this.conf);
	}
}

module.exports = ModelPages;
