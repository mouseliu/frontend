define(function(require, exports, module) {
	var $ = require('$'),
		Widget = require('widget'),
		tpl = require('./cart.handlebars');
	var Templatable = require('templatable');
	//localStorage 
	var store = require('store');
	store.set('user', {
		name: 'marcus',
		likes: 'javascript'
	})
	var user = store.get('user')
	console.log(user.name + ' likes ' + user.likes)

	require('./css.css');
	var category = {
		2: 'card/commerce',
		3: 'card/pvc',
		4: 'card/advance',
		8: 'advert/leaflet'
	};
	var baseUrl = 'http://kuaiyin.zhubajie.com/app/api/';
	var adUrl="http://127.0.0.1:85/api/city";
	var total = 0;
	var address=[{name:"ssd",phone:"12312321",ad:"重庆重庆沙坪坝"},{name:"ssd",phone:"12312321",ad:"重庆重庆沙坪坝"},{name:"ssd",phone:"12312321",ad:"重庆重庆沙坪坝"}]
	var list = Widget.extend({
		Implements: Templatable,
		attrs: {
			template: tpl,
			page: 1
		},
		events: {
			'click .decrement': 'decrement',
			'click .increment': 'increment',
			'click #checkbox-all': 'checkboxAll',
			'click .td-select input': 'tdSelect',
			'click .remove': 'remove',
			'click #add-address':'addAddress',
			'click .o-edit':'oEdit',
			'click .o-remove':'oRemove',
			'change #sel-province':'selProvince',
			'change #sel-city':'selCity',
			'change #sel-county':'selCounty'
		},
		starProvince:function(){
			var url = adUrl;
			$.ajax({
				url: url,
				dataType: $.support.cors ? 'json' : 'jsonp',
				success: function(data) {
					$("#sel-province").empty();
					$("<option value=''>请选择省/市</option>").appendTo($("#sel-province"));
					for(i in data){
						$("<option value='"+i+"'>"+i+"</option>").appendTo($("#sel-province"));
					}
					// $.each(data,function(){
					// 	console.log(data)
					// 	$("<option value='"+this.id+"'>"+this.id+"</option>").appendTo($("#sel-province"));
					// })
				},
				error: function() {
					// sysTip.show('系统异常，请稍后再试。');
				}
			});
		},
		selProvince:function(){
			var url = adUrl;
			$.ajax({
				url: url,
				dataType: $.support.cors ? 'json' : 'jsonp',
				success: function(data) {
					var id=$("#sel-province option:selected").val();
					console.log(data[id])
					$("#sel-city").empty();
					$("<option value=''>请选择区/县</option>").appendTo($("#sel-city"));
					for(i in data[id]){
						$("<option value='"+i+"'>"+data[id][i]+"</option>").appendTo($("#sel-city"));
					}
				},
				error: function() {
					// sysTip.show('系统异常，请稍后再试。');
				}
			});
		},
		selCity:function(){
			var url = adUrl;
			$.ajax({
				url: url,
				dataType: $.support.cors ? 'json' : 'jsonp',
				success: function(data) {
					$.each(data,function(){
						// $("<option value='111'>UPS Ground</option>").appendTo($("#sel-city"));
					})
				},
				error: function() {
					// sysTip.show('系统异常，请稍后再试。');
				}
			});
		},
		selCounty:function(){
			var url = "http://127.0.0.1:85/api/city";
			$.ajax({
				url: url,
				dataType: $.support.cors ? 'json' : 'jsonp',
				success: function(data) {
					$.each(data,function(){
						$("<option value='111'>UPS Ground</option>").appendTo($("#selCounty"));
					})
				},
				error: function() {
					// sysTip.show('系统异常，请稍后再试。');
				}
			});
		},
		addAddress:function(event){
			$("#address-form").show();
			this.starProvince();
		},
		oEdit:function(event){
			$("#address-form").show();
			this.starProvince();
			var ad={name:"张三",ad:"重庆重庆",phone:"12312312"}
			$("#address #name").val(ad.name)
			$("#address #address-more").val(ad.ad)
			$("#address #phone").val(ad.phone)
		},
		oRemove:function(event){
			$(event.target).parent().parent().parent().remove();
			//remove data
			$(".ui-table tr").removeClass("ui-table-split");
			$(".ui-table tr:odd").addClass("ui-table-split");
		},
		total: function() {
			total = 0;
			for (var i = 0; i < $(".td-select input").length; i++) {
				if ($(".td-select input").eq(i).is(":checked")) {
					total += $(".td-select input").eq(i).parent().parent().find(".quantity-text").val() * $(".td-select input").eq(i).parent().parent().find(".td-price span").attr("data")
				};
			};
			$("#finalPrice").html("￥" + total)
		},
		decrement: function(event) {
			event.preventDefault();
			var num = $(event.target).parent().find($(".quantity-text")).val();
			if (num <= 0) {
				num = 0;
			} else {
				num--;
			};
			$(event.target).parent().find($(".quantity-text")).val(num)
			this.total();
		},
		increment: function(event) {
			event.preventDefault();
			var num = $(event.target).parent().find($(".quantity-text")).val();
			if (num >= 111110) {
				num = 111110;
			} else {
				num++;
			};
			$(event.target).parent().find($(".quantity-text")).val(num)
			this.total();

		},
		checkboxAll: function() {

			if ($("#checkbox-all")[0].checked) {
				///$("input[name='checkbox']").each(function(){this.checked=true;});
				$(".td-select").find("input").attr("checked", 'true')
			};
			this.total();
		},
		tdSelect: function(event) {

			if ($(event.target)[0].checked) {
				///$("input[name='checkbox']").each(function(){this.checked=true;});
				//$(".td-select").find("input").attr("checked",'true')
			} else {
				$("#checkbox-all").removeAttr("checked");
			};
			this.total();
		},
		remove: function(event) {
			$(event.target).parent().parent().remove();
			//remove data
			this.total();
		},
		getList: function() {

			//$("#finalPrice").html("￥" + total)
			var pid = this.get('pid') || 2;
			if (!category[pid]) {
				this.renderPartial();
				return;
			}
			var _this = this;
			var url = baseUrl + category[pid] + '/' + this.get('page');
			// sysTip.show('玩儿命加载中，请稍候……');
			$.ajax({
				url: url,
				context: this,
				dataType: $.support.cors ? 'json' : 'jsonp',
				success: function(data) {
					data.data.pages = $.map(data.data.pages, function(value, index) {
						return {
							text: value,
							active: value === _this.get('page'),
							link: $.isNumeric(value)
						};
					});
					this.set('model', data.data);
					this.renderPartial();
					$(".td-select").find("input").attr("checked", 'true')
					this.total();
					$(".ui-table tr").removeClass("ui-table-split");
					$(".ui-table tr:odd").addClass("ui-table-split");
					this.starProvince();
					// sysTip.hide();
				},
				error: function() {
					// sysTip.show('系统异常，请稍后再试。');
				}
			});
		},
		setup: function() {
			this.getList();
		}
	});

	module.exports = list;

});