seajs.use(['slide'], function(Slide) {
    var slide = new Slide({
        element: '#slide-demo-1',
        effect: 'fade',
        activeIndex: 0
    }).render();
});
seajs.use(['slide'], function(Slide) {
    var slide = new Slide({
        element: '#slide-demo-2',
        effect: 'fade',
        activeIndex: 0
    }).render();
});