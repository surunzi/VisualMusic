// ThreeJs Renderer
define(['util'], function (util) {

var container = util.getById('threed-webgl-renderer'),
    $container = $('#threed-webgl-renderer'),
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

$(window).on('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.hide = function () {
    $container.addClass('hidden');
}

renderer.show = function () {
    $container.removeClass('hidden');
}

return renderer;

});