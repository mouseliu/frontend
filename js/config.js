seajs.config({
    base: 'http://static.alipayobjects.com',
    alias: {
        '$': 'jquery/jquery/1.7.2/jquery',
        '$-debug': 'jquery/jquery/1.7.2/jquery',
        'jquery': 'jquery/jquery/1.7.2/jquery',
        'jquery-debug': 'jquery/jquery/1.7.2/jquery-debug',
        'seajs-debug': 'seajs/seajs-debug/1.1.1/seajs-debug',
        'store': 'gallery/store/1.3.14/store',
        'es5-safe': 'gallery/es5-safe/0.9.2/es5-safe',
        'json': 'gallery/json/1.0.3/json',
        'widget': 'arale/widget/1.1.1/widget',
        'validator': 'arale/validator/0.9.5/validator',
        'handlebars': 'gallery/handlebars/1.0.2/handlebars',
        'templatable': 'arale/templatable/0.9.2/templatable',
        'cookie': 'arale/cookie/1.0.2/cookie',
        'popup': 'arale/popup/1.1.6/popup',
        'tabs': 'arale/switchable/1.0.2/tabs',
        'slide': 'arale/switchable/1.0.2/slide',
        'carousel': 'arale/switchable/1.0.2/carousel',
        'accordion': 'arale/switchable/1.0.2/accordion',
        'tip': 'arale/tip/1.2.1/tip',
        'autocomplete': 'arale/autocomplete/1.2.4/autocomplete',
        'dialog': 'arale/dialog/1.3.0/dialog',
        'confirmbox': 'arale/dialog/1.3.0/confirmbox',
        'calendar': 'arale/calendar/1.0.0/calendar',
        'jsuri': 'gallery/jsuri/1.2.2/jsuri',
        'md5': 'gallery/blueimp-md5/1.1.0/md5'
    },
    comboExcludes: /\/js\/.*/
});
define('hack$', [], function() {
    return window.$;
});
seajs.use('hack$');
seajs.cache[seajs.resolve('$')] = seajs.cache[seajs.resolve('$-debug')] =
    seajs.cache[seajs.resolve('jquery')] = seajs.cache[seajs.resolve('jquery-debug')] = seajs.cache[seajs.resolve('hack$')];

$(function() {

    var $tip = $("#alert");
    window.sysTip = {
        "tip": $tip,
        "show": function(msg, type) {
            msg = msg || "正在处理您的请求...";
            if (msg) {
                sysTip.tip.html("<i></i><span>" + msg + "</span>");
            };
            return sysTip.tip.show();
        },
        "hide": function() {
            return sysTip.tip.fadeOut();
        },
        "auto": function(msg, type, time) {
            time = time || +type || sysTip.delay; //如果type可以被转换为数值，将被认为是时间参数，因此可以调用tipAuto("message", 2000);
            var meta = sysTip.show(msg, type);
            if (type == "sys-warn") {
                time = time * 2;
            } else if (type == "sys-error") {
                time = time * 3;
            };
            setTimeout(function() {
                    sysTip.hide(meta)
                },
                time);
            return sysTip;
        },
        "debug": function(msg) {
            sysTip.show(msg);
        },
        "alert": function(msg) {
            alert(msg);
        },
        "delay": 3000
    };

    $.ajaxSetup({
        cache: false,
        dataType: 'json',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // @tofishes, add unok status tip
        statusCode: {
            500: function() {
                sysTip.show('服务器错误(500), 请稍后重试! ');
            },
            503: function() {
                sysTip.show('服务器繁忙(503)，请刷新重试！');
            },
            504: function() {
                sysTip.show('请求超时(504)，请刷新重试！');
            },
            403: function() {
                sysTip.show('无权限(403), 请尝试重新授权！');
            }
        }
    });

    /* 防止ajax重复请求过滤器 */
    // @tofishes
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        var args = originalOptions;
        var _url = args.url || location.href;
        var data = args.data || {};
        //参数名+url做唯一判定
        var xhrId = [_url];
        for (var key in data) {
            xhrId.push(key);
        }
        xhrId = xhrId.join('');

        var cacheXhr = window[xhrId];
        if (cacheXhr && cacheXhr.readyState != 4) {
            cacheXhr.abort();
        }
        window[xhrId] = jqXHR;

        if (options.url.search(/^http|^api/) === -1) {
            options.url = 'api/' + options.url;
        }

        function reportErr(status) {
            if (document.location.host != 'www.kmsocial.cn') {
                return;
            }
            $.get('/kk.php', {
                f: options.url,
                requestStatus: status
            });
        }

        options.success = function() {
            if (!arguments[0] && options.url.indexOf('/kk.php') == -1) {
                reportErr('closed');
                if (/\/userAccShow/.test(options.url)) {
                    document.location.assign('/p/logout/');
                }
                return;
            }
            // @tofishes 暂时对 -99 需要登录做个处理
            // 从isOK方法中移出到这里，防止被customErr过滤掉
            var data = arguments[0];
            if (data && !data.state && data.code === 'err.api.not_login') {
                window.location.assign('/api/logout/');
            }
            if (!options.customErr) { //如果自定义错误提示为true，跳过默认拦截
                if (data && !data.state) {
                    // sysTip.hide();
                    msg = data.msg || '未知错误！';
                    sysTip.auto(msg, 3000);
                    // 调试阶段暂时注释掉全局异常处理
                    // alert(msg);
                    // return false;
                }
            }
            originalOptions.success && originalOptions.success.apply(options.context || this, arguments);
        };
        options.error = function(jqXHR, textStatus, errorThrown) {
            reportErr(textStatus);
        };
    });
});