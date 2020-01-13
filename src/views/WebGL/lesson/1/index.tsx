import { createComponent, ref, onMounted } from '@vue/composition-api';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, LineBasicMaterial, Geometry, Vector3, Line, AmbientLight, DirectionalLight, PointLight, PointLightHelper, SpotLight, SpotLightHelper, CameraHelper, MeshPhongMaterial, ExtrudeBufferGeometry, Shape, Color, DoubleSide, Object3D } from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../../style.css';

export default createComponent({
  name: 'WebGL',
  setup() {
    const canvas = ref(null);

    onMounted(() => {
        const canvasEl: any = canvas.value;

        console.log(canvasEl)

        init(canvasEl);
    })

    return {
        canvas
    }
  },
  render() {
    return (
    <div class="webgl-wrap">
        <canvas ref="canvas"></canvas>
        <div id="info">Description</div>
    </div>
    );
  }
});

async function init(canvas: HTMLCanvasElement) {
    canvas.width = canvas.parentElement!.clientWidth
    canvas.height = canvas.parentElement!.clientHeight

    const renderer = new WebGLRenderer({
        canvas,
        antialias: true,    // 抗锯齿
        // alpha: true      // 不透明度
    });

    /**
     * 接下来创建摄像机
     * 透视相机：new PerspectiveCamera(视角，看到的窗口宽度和高度的比例，能看到的最近处的距离，和能看到的最远处的距离) 
     * 视角越大，拍摄到的场景范围就越大，能看到的物体就显得越小。
     * 在初始化camera时，一般都会先设置好它的3个属性，position/up/lookAt
     * 更多：https://threejsfundamentals.org/threejs/lessons/zh_cn/threejs-fundamentals.html
     */
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 10;
    const camera = new PerspectiveCamera(fov, aspect, near, far);

    /**
     * 近平面和远平面的高度由fov决定。 两个平面的宽度由fov和aspect决定。
     * 截椎体内部的物体将被绘制，截椎体外的东西将不会被绘制。
     * 摄像机默认指向Z轴负方向，上方向朝向Y轴正方向。我们将会把立方体 放置在坐标原点，所以我们需要往后移动摄像机才能看到物体。
     */
    camera.position.z = 2;

    // 摄像机控制器
    const controls = new OrbitControls(camera);

    camera.position.set( -5, -5, 0 );
    controls.update();
    renderer.setSize( canvas.clientWidth, canvas.clientHeight );

    // 创建场景
    const scene = new Scene();

    const cube = drawBox();
    // scene.add(cube);
    
    /**
     * 添加光源
     * 平行光有一个位置和目标点。默认值都为 0, 0, 0。 
     * 我们这里 设置灯光的位置为 -1, 2, 4 所以它位于摄像机前面的 稍微左上方一点。目标点还是 0, 0, 0 所以它朝向 坐标原点。
     */
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new DirectionalLight(color, intensity);
        light.position.set(1, -2, -4);
        scene.add(light);
    }
    
    const line = drawLine();
    const loader = new GLTFLoader();
    
    loader.setPath('http://localhost:3030/model/');

    const ship = await drawShip(loader);

    const addSolidGeometry = createAddSolidGeometryContainer(scene);

    scene.add(ship.scene);

    // @ts-ignore
    addSolidGeometry(-2, -2, drawHeart());
    // scene.add( cube, line );
    // scene.add(drawHeart().)

    camera.position.z = 1;
    renderer.shadowMap.enabled = true;
    scene.background = new Color(0xAAAAAA);

    var spotLight = new SpotLight( 0xffffff );
    spotLight.position.set( 10, 10, 10 );
    scene.add( spotLight );

    var spotLightHelper = new SpotLightHelper( spotLight );
    scene.add( spotLightHelper );

    function animate() {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    
    animate();
}

function resizeRendererToDisplaySize(renderer: WebGLRenderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

function createObjectContainer(scene: Scene) {
    const objects = [];
    const spread = 15;

    return function addObject(x: number, y: number, obj: Object3D) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
      }
}

function createMaterial() {
    const material = new MeshPhongMaterial({
      side: DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}

function createAddSolidGeometryContainer(scene: Scene) {
    const addObject = createObjectContainer(scene);

    return function addSolidGeometry(x: number, y: number, geometry: Geometry) {
        const mesh = new Mesh(geometry, createMaterial());
        addObject(x, y, mesh);
    }
}

function drawHeart() {
    const shape = new Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
        steps: 2,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 2,
    };

    return new ExtrudeBufferGeometry(shape, extrudeSettings);
}

function drawBox() {
    const geometry = new BoxGeometry( 1, 1, 1 );
    // const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const material = new MeshPhongMaterial( { color: 0x00ff00 } ); // 此材质受光照影响
    return new Mesh( geometry, material );
}

function drawLine() {
    const material = new LineBasicMaterial( { color: 0x0000ff } );
    const geometry = new Geometry();

    geometry.vertices.push(new Vector3( -10, 0, 0) );
    geometry.vertices.push(new Vector3( 0, 10, 0) );
    geometry.vertices.push(new Vector3( 10, 0, 0) );

    return new Line( geometry, material );
}

function drawShip(loader: GLTFLoader) {
    return new Promise<GLTF>((resolve, reject) => {
        // loader.load( 'McLaren.glb', function ( gltf ) {
        loader.load( 'scene.gltf', function ( gltf ) {
            gltf.scene.scale.set(0.1, 0.1, 0.1)

            resolve(gltf);
        }, undefined, function ( error ) {
            reject( error );
        });
    })
}
