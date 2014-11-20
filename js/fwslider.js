seajs.use(['carousel','$'], function(Slide,$) {
    var slide = new Slide({
        element: '#carousel',
        easing: 'easeOutStrong',
        effect: 'scrollx',
        autoplay:"true"
    }).render();
});
