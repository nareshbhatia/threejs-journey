import * as THREE from 'three';

export function createCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(75);
  camera.position.set(0, 1000, 1000);
  return camera;
}
