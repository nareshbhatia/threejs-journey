import * as THREE from 'three';

export function createCamera(): THREE.PerspectiveCamera {
  const fov = 75;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

  // x: 0, y: 1000, z: 1000
  camera.position.set(0, 1000, 1000);
  return camera;
}
