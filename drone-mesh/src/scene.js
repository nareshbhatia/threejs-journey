import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();

  const grid = new THREE.GridHelper(1000, 20, 0x333333, 0x222222);
  // scene.add(grid);

  const axes = new THREE.AxesHelper(300);
  // scene.add(axes);

  return scene;
}
