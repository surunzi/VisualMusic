// 9号可视化效果
// 由threejs的示例文件更改而来
define(['analyser', 'util', 'renderer'], function (analyser, util, renderer) {

var cover = 'e9.jpg',
    camera, scene, particles, geometry,
    materials = [], parameters, i, j, h, color, size,
    time,
    data, len, total, avg = [];
    initOrNot = false;

function draw() {
    if (!camera) {
        init();
        return;
    }
    data = analyser.getData();
    len = data.length / 2;
    for (i = 0; i < 5; i++) {
        total = 0;
        for (j = i * 20, len = i * 20 + 20; j < len; j++) {
            total += data[j];
        }
        avg[i] = Math.floor(total / 50);
    }

    for (i = 0, len = materials.length; i < len; i++) {
        materials[i].size = avg[i];
    }

    camera.position.z = 1000 - avg[0];

    time = Date.now() * 0.00005;
    
    camera.lookAt(scene.position);

    for ( i = 0, len = scene.children.length; i < len; i++ ) {
        var object = scene.children[i];
        if (object instanceof THREE.ParticleSystem) {
            object.rotation.x = object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
        }
    }

    for ( i = 0, len = materials.length; i < len; i ++ ) {
        color = parameters[i][0];
        h = (360 * (color[0] + time) % 360) / 360;
        materials[i].color.setHSL(h, color[1], color[2]);
    }

    renderer.render(scene, camera);
}

function init() {
    util.setBg(9);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0007);

    geometry = new THREE.Geometry();

    for ( i = 0; i < 2000; i ++ ) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;
        geometry.vertices.push(vertex);
    }

    parameters = [
        [[1, 1, 0.5], 5],
        [[0.80, 1, 0.5], 4],
        [[0.60, 1, 0.5], 3],
        [[0.40, 1, 0.5], 2],
        [[0.20, 1, 0.5], 1]
    ];

    for ( i = 0; i < parameters.length; i ++ ) {
        color = parameters[i][0];
        size  = parameters[i][1];
        materials[i] = new THREE.ParticleSystemMaterial({
            size: size,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent : true 
        });
        particles = new THREE.ParticleSystem(geometry, materials[i]);
        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;
        scene.add(particles);
    }
    
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