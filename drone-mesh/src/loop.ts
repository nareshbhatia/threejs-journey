import * as THREE from 'three';
import type { RunLoopOptions } from './types.js';

export function runLoop({
  scene,
  camera,
  renderer,
  controls,
  updatables,
}: RunLoopOptions): void {
  const timer = new THREE.Timer();

  function animate(): void {
    requestAnimationFrame(animate);

    timer.update();
    const elapsed = timer.getElapsed();

    for (const fn of updatables) {
      fn(elapsed);
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}
