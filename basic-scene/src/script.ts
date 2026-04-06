import { createCamera } from './camera.js';
import { createContent } from './content.js';
import { createControls } from './controls.js';
import { addLights } from './lights.js';
import { createRenderer } from './renderer.js';
import { startOrbitRenderLoop } from './renderLoop.js';
import { bindResize } from './resize.js';
import { createScene } from './scene.js';

/** ---------- Scene construction sequence ---------- */
// 1. Scene
// 2. Camera
// 3. Lights (ambient, directional, point)
// 4. One or more meshes
// 5. A renderer
// 6. Controls to interact with the scene

/** ---------- Scene ---------- */
const scene = createScene();

/** ---------- Camera ---------- */
const camera = createCamera();

/** ---------- Lights ---------- */
addLights(scene);

/** ---------- Meshes ---------- */
const content = createContent();
scene.add(content);

/** ---------- Renderer ---------- */
const canvas = document.querySelector('canvas.webgl');
if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
  throw new Error('Expected a single <canvas class="webgl"> in the document.');
}

const renderer = createRenderer(canvas);
bindResize(camera, renderer);
const controls = createControls(camera, renderer.domElement);

/** ---------- Run Loop ---------- */
startOrbitRenderLoop({ scene, camera, renderer, controls });
