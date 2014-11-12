// Login Form
seajs.use(['validator', '$', 'md5','cookie'], function(Validator, $, md5,Cookie) {
	$(function() {
		var NewValidator = Validator.extend({
			attrs: {
				showMessage: function(message, element) {
					message = '<i class="ui-tiptext-icon iconfont">&#xF045;</i>\
                               <span class="ui-form-explain-text">' + message + '</span>';
					this.getExplain(element)
						.addClass('ui-tiptext ui-tiptext-error')
						.html(message);
					this.getItem(element).addClass(this.get('itemErrorClass'));
				}
			}
		});
		//login
		var validatorLogin = new NewValidator({
			element: '#test-form-login',
			onFormValidated: function(err, results, form) {
				window.console && console.log && console.log(err, results, form);
			},
			autoSubmit: false,
			failSilently: true
		});
		validatorLogin.addItem({
			element: '#mobile',
			required: true,
			rule: 'mobile',
			hideMessage: function(message, element) {
				// 结束日期校验通过后会调用这个函数。如果前面的开始日期没有出错的时候才清空消息。
				var startErr = $.trim(this.getExplain(element).html());
				if (!startErr) {
					this.getExplain(element).html(element.attr('data-explain') || ' ');
					this.getItem(element).removeClass(this.get('itemErrorClass'));
				}
			}
		})

		validatorLogin.addItem({
			element: '#password',
			required: true
		})
		validatorLogin.addItem({
			element: '#login',
			required: true,
			onItemValidated: function(elem) {
				var url = "http://127.0.0.1:81/json/login.json";
				$.ajax({
					url: url,
					//context: this,
					dataType: 'json',
					success: function(data) {
						var has = false;
						for (i = 0; i < data.length; i++) {
							if ($("#mobile").val() == data[i].mobile && $("#password").val() == data[i].password) {
								has = true;
							}
						}
						if (has) {
							$("#login").parent().removeClass("ui-form-item-error")
							$("#login").next().html("")
						   	Cookie.set('mobile', $("#mobile").val(), {
						        domain: 'example.com',
						        path: '/',
						        expires: 30
						    });
						} else {
							$("#login").parent().addClass("ui-form-item-error")
							$("#login").next().html("手机号码或密码错误")
						};
					},
					error: function(message) {
						//message
					}
				});
			}
		})

	});
});