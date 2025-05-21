import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/DRACOLoader.js';

const canvas = document.querySelector('#viewer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

// Отримуємо модель з data-атрибута
const modelPath = canvas.dataset.model;

loader.load(modelPath, (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  model.position.set(0, 0, 0);
}, undefined, (error) => {
  console.error(error);
});

camera.position.set(0, 1, 3);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();