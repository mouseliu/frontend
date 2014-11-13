define(function (require, exports, module) {
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

    var total=0;
    var list = Widget.extend({
        Implements: Templatable,
        attrs: {
            template: tpl,
            page: 1
        },
        events: {
            'click .decrement': 'decrement',
            'click .increment': 'increment',
            'click #checkbox-all':'checkboxAll',
            'click .td-select input':'tdSelect',
            'click .remove':'remove'
        },
        decrement:function(event){
        	event.preventDefault();
        	  var num=$(event.target).parent().find($(".quantity-text")).val();
        	  if (num<=0) {
        	  		num=0;
        	  }else{
		        	num--;
        	  };
        	 $(event.target).parent().find($(".quantity-text")).val(num)
        },
        increment:function(event){
        	event.preventDefault();
        	  var num=$(event.target).parent().find($(".quantity-text")).val();
        	  if (num>=111110) {
        	  		num=111110;
        	  }else{
		        	num++;
        	  };
        	 $(event.target).parent().find($(".quantity-text")).val(num)


        	 for (var i = 0;i<$(".td-select input").length;i++) {
        	 	if ($(".td-select input").eq(i).is(":checked")) {
        	 		console.log($(".td-select input").eq(i).parent().parent().find(".td-price span").html());
        	 		console.log(parseInt("234das"))
        	 		console.log(parseInt($(".td-select input").eq(i).parent().parent().find(".td-price span").html()));
        	 		total+=$(".td-select input").eq(i).parent().parent().find(".quantity-text").val()*parseInt($(".td-select input").eq(i).parent().parent().find(".td-price span").html())
        	 	};
        	 };
        	 $("#finalPrice").html("￥"+total)
        },
        checkboxAll:function(){

        		if ($("#checkbox-all")[0].checked) {
        			///$("input[name='checkbox']").each(function(){this.checked=true;});
	        		$(".td-select").find("input").attr("checked",'true')
        		};
        },
        tdSelect:function(event){
        	
        		if ($(event.target)[0].checked) {
        			///$("input[name='checkbox']").each(function(){this.checked=true;});
	        		//$(".td-select").find("input").attr("checked",'true')
        		}else{
        			$("#checkbox-all").removeAttr("checked");
        		};
        },
        remove:function(event){
        		$(event.target).parent().parent().remove();
        		//remove data
        },
        getList: function () {

            var pid = this.get('pid') || 2;
            if(!category[pid]){
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
