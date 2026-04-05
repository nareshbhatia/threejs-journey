import { createCamera } from './camera.js';
import { createControls } from './controls.js';
import { createDrone, createDroneUpdater } from './drone.js';
import { addLights } from './lights.js';
import { runLoop } from './loop.js';
import { createRenderer } from './renderer.js';
import { bindResize } from './resize.js';
import { createScene } from './scene.js';

const scene = createScene();
const camera = createCamera();
scene.add(camera);

addLights(scene);

const drone = createDrone();
scene.add(drone);

const canvas = document.querySelector('canvas.webgl');
if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
  throw new Error('Expected a single <canvas class="webgl"> in the document.');
}
const renderer = createRenderer(canvas);

bindResize(camera, renderer);

const controls = createControls(camera, renderer.domElement);

const updatables = [createDroneUpdater(drone)];

runLoop({ scene, camera, renderer, controls, updatables });
