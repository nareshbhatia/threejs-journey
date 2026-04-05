import * as THREE from "three";

export function createRenderer(canvas) {
  return new THREE.WebGLRenderer({
    canvas,
  });
}
