define(function (require, exports, module) {
    var $ = require('$'),
        Widget = require('widget'),
        tpl = require('./cart.handlebars');
    var Templatable = require('templatable');
    //localStorage 
    var store=require('store');
    store.set('user', { name: 'marcus', likes: 'javascript' })
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
        total:function(){
        	total=0;
        	 for (var i = 0;i<$(".td-select input").length;i++) {
        	 	if ($(".td-select input").eq(i).is(":checked")) {
        	 		total+=$(".td-select input").eq(i).parent().parent().find(".quantity-text").val()*$(".td-select input").eq(i).parent().parent().find(".td-price span").attr("data")
        	 	};
        	 };
        	 $("#finalPrice").html("￥"+total)
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
        	 this.total();
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
        	 this.total();

        },
        checkboxAll:function(){

        		if ($("#checkbox-all")[0].checked) {
        			///$("input[name='checkbox']").each(function(){this.checked=true;});
	        		$(".td-select").find("input").attr("checked",'true')
        		};
        		this.total();
        },
        tdSelect:function(event){
        	
        		if ($(event.target)[0].checked) {
        			///$("input[name='checkbox']").each(function(){this.checked=true;});
	        		//$(".td-select").find("input").attr("checked",'true')
        		}else{
        			$("#checkbox-all").removeAttr("checked");
        		};
        		this.total();
        },
        remove:function(event){
        		$(event.target).parent().parent().remove();
        		//remove data
        		this.total();
        },
        getList: function () {
        	 $("#finalPrice").html("￥"+total)
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
        					this.total();
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
