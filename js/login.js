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
        //login
        var validatorLogin = new NewValidator({
            element: '#test-form-login',
            onFormValidated: function(err, results, form) {
                window.console && console.log && console.log(err, results, form);
            },
            failSilently: true
        });
        validatorLogin.addItem({
            element: '#username',
            required: true,
            rule: 'mobile'
        })

        validatorLogin.addItem({
            element: '#password',
            required: true,
            rule: 'minlength{"min":5} maxlength{"max":20}'
        })

    });
});
