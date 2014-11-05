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
    }
});
define('hack$', [], function() {
    return window.$;
});
seajs.use('hack$');
seajs.cache[seajs.resolve('$')] = seajs.cache[seajs.resolve('$-debug')] =
    seajs.cache[seajs.resolve('jquery')] = seajs.cache[seajs.resolve('jquery-debug')] = seajs.cache[seajs.resolve('hack$')];