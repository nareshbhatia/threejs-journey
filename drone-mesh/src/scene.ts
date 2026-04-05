import * as THREE from 'three';

export function createScene(): THREE.Scene {
  const scene = new THREE.Scene();

  const grid = new THREE.GridHelper(1000, 20, 0x333333, 0x222222);
  // scene.add(grid);

  const axes = new THREE.AxesHelper(300);
  // scene.add(axes);

  void grid;
  void axes;

  return scene;
}
