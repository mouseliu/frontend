// Login Form
seajs.use(['validator', '$', 'md5'], function(Validator, $, md5) {
    $(function() {
        var NewValidator = Validator.extend({
            attrs: {
                itemSuccessClass: 'ui-form-item-success',
                showMessage: function(message, element) {
                    message = '<i class="ui-tiptext-icon iconfont">&#xF045;</i><span class="ui-form-explain-text">' + message + '</span>';
                    // this.getExplain(element).html(element.attr('data-explain') || ' ');
                    this.getExplain(element)
                        .addClass('ui-tiptext ui-tiptext-error')
                        .html(message);
                    this.getItem(element).removeClass(this.get('itemSuccessClass')).addClass(this.get('itemErrorClass'));
                },
                hideMessage: function(message, element) {
                    message = message || '';
                    message = '<i class="ui-tiptext-icon iconfont">&#xF049;</i><span class="ui-form-explain-text">' + message + '</span>';

                    this.getExplain(element).removeClass('ui-tiptext-error')
                        .addClass('ui-tiptext ui-tiptext-success')
                        .html(message);
                    this.getItem(element).removeClass(this.get('itemErrorClass')).addClass(this.get('itemSuccessClass'));
                }
            }
        });

        NewValidator.addRule('checkMoblieExist', function(options, commit) {
            var element = options.element,
                item = Validator.query('form').getItem(element);

            item.addClass('ui-form-item-loading');

            $.getJSON('checkMoblieExist', {
                mobile: item.val()
            }, function(data) {
                item.removeClass('ui-form-item-loading');
                commit(data.state, data.msg);
            });
        });

        var step1 = $('#register'),
            regNav = $('#register-nav'),
            regWrap = $('#register-wrap');

        //reg step1
        var validator = new NewValidator({
            element: step1,
            failSilently: true,
            autoSubmit: false,
            onFormValidated: function(err, results, form) {
                var reg_data = {
                    mobile: '',
                    password: md5($('#password').val() + 'iotmaill@2014', 'youhua'),
                    validCode: ''
                }
                if (!err) {
                    var submitBtn = $('#step1-submit');
                    submitBtn.prop('disabled', true).removeClass('ui-button-lorange').addClass('ui-button-ldisable');

                    $.getJSON('sendMsg', {
                        mobile: $('#telphone').val()
                    }, function(data) {
                        if (data.state) {
                            regWrap.removeClass('step1').addClass('step2');
                            regNav.find('li:first').removeClass('ui-step-active').addClass('ui-step-done');
                            regNav.find('li:eq(1)').addClass('ui-step-active');
                        }
                    });
                }
            }
        });


        validator.addItem({
            element: '[name="telphone"]',
            required: true,
            rule: 'mobile checkMoblieExist'
        });

        validator.addItem({
            element: '[name=agree]',
            required: true,
            rule: 'checkbox ',
            errormessageRequired: '请接受协议'
        });

        step1.on('submit', function(event) {
            // event.preventDefault();
            // return false;
        });



        //reg step2
        // var validatorPass = new NewValidator({
        //     element: '#register-step2',
        //     onFormValidated: function(err, results, form) {
        //         window.console && console.log && console.log(err, results, form);
        //         var reg_data = {
        //             mobile: '',
        //             password: md5($('#password').val() + 'iotmaill@2014', 'youhua'),
        //             validCode: ''
        //         }
        //     },
        //     failSilently: true
        // })

        validator.addItem({
            element: '#password',
            required: true,
            rule: 'minlength{"min":5} maxlength{"max":20}'
        })

        validator.addItem({
            element: '#password-confirmation',
            required: true,
            rule: 'confirmation{target: "#password", name: "第一遍"}',
            errormessageRequired: '请再重复输入一遍密码，不能留空。'
        })
    });
});