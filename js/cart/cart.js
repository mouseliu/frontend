define(function(require, exports, module) {
	var $ = require('$'),
		Widget = require('widget'),
		tpl = require('./cart.handlebars');
	var Templatable = require('templatable');
	require('./css.css');
	var category = {
		2: 'card/commerce',
		3: 'card/pvc',
		4: 'card/advance',
		8: 'advert/leaflet'
	};
	var baseUrl = 'http://kuaiyin.zhubajie.com/app/api/';


	var cart = Widget.extend({
		Implements: Templatable,
		attrs: {
			template: tpl
		},
		events: {
			//'click .ui-paging a': 'page'
		},
		page: function(e) {
			var elem = $(e.target);
			var page = elem.data('page');
			if (page === this.get('page')) {
				return;
			} else {
				this.set('page', page);
				this.getList();
			}
		},
		getCart: function() {
			// var pid = this.get('pid') || 2;
			// if (!category[pid]) {
			// 	this.renderPartial();
			// 	return;
			// }
			// var _this = this;
			// var url = baseUrl + category[pid] + '/' + this.get('page');
			// // sysTip.show('玩儿命加载中，请稍候……');
			// $.ajax({
			// 	url: url,
			// 	context: this,
			// 	dataType: $.support.cors ? 'json' : 'jsonp',
			// 	success: function(data) {
			// 		data.data.pages = $.map(data.data.pages, function(value, index) {
			// 			return {
			// 				text: value,
			// 				active: value === _this.get('page'),
			// 				link: $.isNumeric(value)
			// 			};
			// 		});
			// 		this.set('model', data.data);
			// 		this.renderPartial();
			// 		// sysTip.hide();
			// 	},
			// 	error: function() {
			// 		// sysTip.show('系统异常，请稍后再试。');
			// 	}
			// });
		},
		setup: function() {
			//this.getCart();
		}
	});

	module.exports = cart;

});