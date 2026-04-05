import { createCamera } from './camera.js';
import { createContent } from './content.js';
import { createControls } from './controls.js';
import { addLights } from './lights.js';
import { createRenderer } from './renderer.js';
import { startOrbitRenderLoop } from './renderLoop.js';
import { bindResize } from './resize.js';
import { createScene } from './scene.js';

const scene = createScene();
const camera = createCamera();
scene.add(camera);

addLights(scene);

const content = createContent();
scene.add(content);

const canvas = document.querySelector('canvas.webgl');
if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
  throw new Error('Expected a single <canvas class="webgl"> in the document.');
}
const renderer = createRenderer(canvas);

bindResize(camera, renderer);

const controls = createControls(camera, renderer.domElement);

startOrbitRenderLoop({ scene, camera, renderer, controls });
