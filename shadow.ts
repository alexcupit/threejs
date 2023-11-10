import * as THREE from 'three';

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.Camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Create a PointLight and turn on shadows for the light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 4);
light.castShadow = true; // default false
scene.add(light);

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add(sphere);

//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);

//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);

renderer.render(scene, camera);

camera.position.set(0, 6, 10);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
