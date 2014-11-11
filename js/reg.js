// Login Form
seajs.use(['validator', '$', 'md5'], function(Validator, $, md5) {
    $(function() {
        var NewValidator = Validator.extend({
            attrs: {
                itemSuccessClass: 'ui-form-item-success',
                showMessage: function(message, element) {
                    message = '<i class="ui-tiptext-icon iconfont">&#xF045;</i>\
                               <span class="ui-form-explain-text">' + message + '</span>';
                    // message = '<i class="ui-tiptext-icon iconfont">&#xF049;</i>\
                    //            <span class="ui-form-explain-text">' + message + '</span>';
                    this.getExplain(element).html(element.attr('data-explain') || ' ');
                    this.getExplain(element)
                        .addClass('ui-tiptext ui-tiptext-error')
                        .html(message);
                    this.getItem(element).addClass(this.get('itemErrorClass'));
                },
                 hideMessage: function (message, element) {
                    message="手机号码可用"
                    message = '<i class="ui-tiptext-icon iconfont">&#xF049;</i>\
                               <span class="ui-form-explain-text">' + message + '</span>';
                    this.getExplain(element).html(element.attr('data-explain') || ' ');
                    this.getExplain(element).removeClass('ui-tiptext-error')
                        .addClass('ui-tiptext ui-tiptext-success')
                        .html(message);
                    this.getItem(element).addClass(this.get('itemSuccessClass'));
                  }
            }
        });

        //reg step1
        var validator = new NewValidator({
            element: '#test-form',
            onFormValidated: function(err, results, form) {
                window.console && console.log && console.log(err, results, form);
            },
            failSilently: true
        });


        validator.addItem({
            element: '[name="telphone"]',
            required: true,
            rule: 'mobile ',
            errormessageRequired: '手机号码错误或已注册'
        })
        validator.query('#test-form [name=telphone]').on('itemValidated', function(error, message, elem) {
            if (error==null) {
                var url="http://127.0.0.1:81/json/login.json";
                $.ajax({
                    url: url,
                    //context: this,
                    dataType: 'json',
                    success: function (data) {
                        var has=false;
                        for(i=0;i<data.length;i++){
                            if (data[i].mobile===$("#telphone").val()) {
                                has=true;
                            }
                        }
                        if (has) {
                            message="手机号码已注册"
                             console.log("手机号码已注册");
                        }else{
                             message="手机号码可用"
                            console.log("手机号码可用");
                        };
                    },
                    error:function(message){
                        //message
                    }
                });
            };
        });
        validator.addItem({
            element: '[name=agree]',
            required: true,
            rule: 'checkbox ',
            errormessageRequired: '请接受协议'
        });



        //reg step2
        var validatorPass = new NewValidator({
            element: '#test-form-pass',
            onFormValidated: function(err, results, form) {
                window.console && console.log && console.log(err, results, form);
                var reg_data = {
                    mobile: '',
                    password: md5($('#password').val() + 'iotmaill@2014', 'youhua'),
                    validCode: ''
                }
            },
            failSilently: true
        })

        validatorPass.addItem({
            element: '#password',
            required: true,
            rule: 'minlength{"min":5} maxlength{"max":20}'
        })

        validatorPass.addItem({
            element: '#password-confirmation',
            required: true,
            rule: 'confirmation{target: "#password", name: "第一遍"}',
            errormessageRequired: '请再重复输入一遍密码，不能留空。'
        })
    });
});
