import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Minimal rAF loop for OrbitControls: damping and user input need `controls.update()` each frame.
 */
export function startOrbitRenderLoop(options: {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  controls: OrbitControls;
}): void {
  const { scene, camera, renderer, controls } = options;

  function tick(): void {
    requestAnimationFrame(tick);
    controls.update();
    renderer.render(scene, camera);
  }

  tick();
}
