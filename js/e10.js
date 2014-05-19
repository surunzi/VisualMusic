// 6号可视化效果
define(['analyser', 'util', 'renderer'], function (analyser, util, renderer) {

var cover = 'e10.jpg',
    camera, scene, particles, geometry, material,
    centerParticles, centerGeometry, centerMaterial,
    i, h, sprite,
    data, len, total, avg;
    initOrNot = false;

function draw() {
    if (!material) {
        init();
        return;
    }
    data = analyser.getData();
    len = data.length / 4;
    total = 0;
    for (i = 0; i < len; i++) {
        total += data[i]
    }
    avg = Math.floor(total / len);

    var time = Date.now() * 0.00005;
    h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
    material.color.setHSL(h, 1.0, 0.8);
    h = (h + 0.2) % 1; 
    centerMaterial.color.setHSL(h, 1.0, 0.8);
    centerMaterial.size = avg / 5;
    particles.rotation.x += 0.01;
    centerParticles.rotation.y += avg * 0.0002;
    centerParticles.rotation.x += avg * 0.0002;
    centerParticles.rotation.z += avg * 0.0002;
    centerParticles.position.z = avg;
    renderer.render(scene, camera);
}

function init() {
    util.setBg(10);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.Geometry();
    sprite = THREE.ImageUtils.loadTexture( "img/spark1.png" );
    material = new THREE.ParticleSystemMaterial({
        size: 25,
        sizeAttenuation: false,
        map: sprite,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
    });
    material.color.setHSL(1.0, 1.0, 1.0);

    for (i = 0; i < 1000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 3000 - 1500;
        vertex.y = Math.random() * 3000 - 1500;
        vertex.z = Math.random() * 2000 - 1000;
        geometry.vertices.push(vertex);
    }

    particles = new THREE.ParticleSystem(geometry, material);
    particles.sortParticles = true;
    scene.add(particles);

    centerGeometry = new THREE.Geometry();
    centerMaterial = new THREE.ParticleSystemMaterial({
        size: 20,
        sizeAttenuation: false,
        map: sprite,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
    });
    centerMaterial.color.setHSL(0.3, 0.8, 0.5);
    for (i = 0; i < 1000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 500 - 250;
        vertex.y = Math.random() * 500 - 250;
        vertex.z = Math.random() * 500 - 250;
        centerGeometry.vertices.push(vertex);
    }
    centerParticles = new THREE.ParticleSystem(centerGeometry, centerMaterial);
    centerParticles.sortParticles = true;
    scene.add(centerParticles);

    initOrNot = true;
}

function isInit() {
    return initOrNot;
}

function enable() {
    renderer.show();
}

function disable() {
    renderer.hide();
}

return {
    draw: draw,
    init: init,
    isInit: isInit,
    cover: cover,
    enable: enable,
    disable: disable
}

});