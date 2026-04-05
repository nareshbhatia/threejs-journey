import * as THREE from "three";

export function runLoop({ scene, camera, renderer, controls, updatables }) {
  const timer = new THREE.Timer();

  function animate() {
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
