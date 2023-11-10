import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 0);
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
//Create a PointLight and turn on shadows for the light
// const light = new THREE.PointLight(0xffffff, 1, 100);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 1);
light.target.position.set(0, 0, -5);
light.castShadow = true; // default false
scene.add(light);
//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
const cube2Geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshNormalMaterial();
const cube2 = new THREE.Mesh(cube2Geometry, material);
cube2.castShadow = true; //default is false
cube2.receiveShadow = false; //default
scene.add(cube2);
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const material: THREE.MeshNormalMaterial = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(cubeGeometry, material);
cube.castShadow = true; //default is false
cube.receiveShadow = true; //default
scene.add(cube);
//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry(10, 15);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.castShadow = false;
plane.position.set(0, -5, -2);
plane.rotateX(-Math.PI / 2);
scene.add(plane);
controls.update();
//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper(light.shadow.camera);
// scene.add(helper);
const orbitGeometry = new THREE.SphereGeometry(0.3);
const orbit1 = new THREE.Mesh(orbitGeometry, material);
cube.add(orbit1);
orbit1.position.set(-1, 1, 0);
orbit1.castShadow = true;
const orbit2 = new THREE.Mesh(orbitGeometry, material);
cube.add(orbit2);
orbit2.position.set(1, 1, 0);
orbit2.castShadow = true;
const orbit3 = new THREE.Mesh(orbitGeometry, material);
cube.add(orbit3);
orbit3.position.set(0, 0, 1);
orbit3.castShadow = true;
camera.position.z = 20;
controls.update();
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube2.rotation.x += 0.02;
    cube2.rotation.y += 0.02;
    const t = clock.getElapsedTime();
    orbit1.position.x = Math.sin(5 * t) * -2;
    orbit1.position.y = Math.sin(5 * t) * 2;
    orbit1.position.z = Math.cos(5 * t) * 2;
    orbit2.position.x = Math.cos(5 * t) * 2;
    orbit2.position.y = Math.cos(5 * t) * 2;
    orbit2.position.z = Math.sin(5 * t) * 2;
    const tOffset = 1.5 + clock.getElapsedTime();
    orbit3.position.x = Math.sin(5 * tOffset) * 0;
    orbit3.position.y = Math.sin(5 * tOffset) * 2;
    orbit3.position.z = Math.cos(5 * tOffset) * 2;
    controls.update();
    renderer.render(scene, camera);
}
animate();
