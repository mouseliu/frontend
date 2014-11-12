define(function (require, exports, module) {
    var $ = require('$'),
        Widget = require('widget'),
		Jsurl = require('jsuri'),
        tpl = require('./proList.handlebars');
    var Templatable = require('templatable');
    require('./css.css');
    var category = {
        2: 'card/commerce',
        3: 'card/pvc',
        4: 'card/advance',
        8: 'advert/leaflet'
    };
    var baseUrl = 'http://kuaiyin.zhubajie.com/app/api/';
	var urlParam = new Jsurl(window.location.href);

    var list = Widget.extend({
        Implements: Templatable,
        attrs: {
            template: tpl,
            page: 1
        },
        events: {
            'click .ui-paging a': 'page',
			'click .order dd': 'types',
			'click .f-list li a': 'brand'
        },
        page: function (e) {
            var elem = $(e.target);
            var page = elem.data('page');
            if(page === this.get('page')){
                return;
            }else{
                this.set('page',page);
                this.getList();
            }
        },
		types: function(e){
			var sorts = $(e.target);
			if(sorts === this.get('sorts')){
                return;
            }else{
                this.set('sorts',sorts.attr('data'));
				this.set('page',1);
                this.getList();
            }
		},
		brand: function(e){
			var brand = $(e.target);
			if(brand === this.get('brand')){
                return;
            }else{
                this.set('brand',brand.attr('data'));
				this.set('page',1);
                this.getList();
            }
		},
        getList: function () {
            var pid = this.get('pid') || 2;
			var sorts = this.get('sorts') || 'all'; //排序
			var brand = this.get('brand') || 'all'; //品牌

            if(!category[pid]){
				
                this.renderPartial();
                return;
            }
            var _this = this;
			
            var url = baseUrl + category[pid] + '/' + this.get('page');
			// var url = baseUrl + '?category=' + pid + '&sorts=' + sorts + '&param=' + urlParam.query() + '&page=' + this.get('page')
            // sysTip.show('玩儿命加载中，请稍候……');
            $.ajax({
                url: 'login',
                context: this,
                dataType: $.support.cors ? 'json' : 'jsonp',
                success: function (data) {
                    data.data.pages = $.map(data.data.pages,function(value,index){
                        return {
                            text:value,
                            active: value === _this.get('page'),
                            link:$.isNumeric(value)
                        };
                    });
                    this.set('model', data.data);
                    this.renderPartial();
                    // sysTip.hide();
                },
                error:function(){
                    // sysTip.show('系统异常，请稍后再试。');
                }
            });
        },
        setup: function () {
            this.getList();
        }
    });

    module.exports = list;

});
