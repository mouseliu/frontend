// Login Form

$(function() {
    var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#loginForm');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
});

seajs.use(['validator', '$'], function(Validator, $) {
    $(function() {
        var NewValidator = Validator.extend({
            attrs: {
                showMessage: function (message, element) {
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
            },
            failSilently: true

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





