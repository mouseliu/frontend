// Login Form
seajs.use(['validator', '$', 'md5'], function(Validator, $, md5) {
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
            rule: 'mobile '
        })

        validator.addItem({
            element: '[name=agree]',
            required: true,
            rule: 'checkbox ',
            errormessageRequired: '请接受协议'
        });

        var validatorPass = new NewValidator({
            element: '#test-form-pass',
            onFormValidated: function(err, results, form) {
                window.console && console.log && console.log(err, results, form);
                var reg_data = {
                    mobile: ,
                    password: md5($('#password').val() + 'iotmaill@2014', 'youhua'),
                    validCode: ,
                };
            },
            failSilently: true});

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
