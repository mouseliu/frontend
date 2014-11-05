seajs.use(['arale/switchable/1.0.2/slide'], function(Slide) {
    var slide = new Slide({
        element: '#slide-demo-1',
        effect: 'fade',
        activeIndex: 0
    }).render();
});
seajs.use(['arale/switchable/1.0.2/slide'], function(Slide) {
    var slide = new Slide({
        element: '#slide-demo-2',
        effect: 'fade',
        activeIndex: 0
    }).render();
});