import * as THREE from 'three';

export function createScene(): THREE.Scene {
  const scene = new THREE.Scene();

  // size: 1000 x 1000
  // divisions: 20
  // color1 (center line): gray
  // color2 (grid lines): dark gray
  const grid = new THREE.GridHelper(1000, 20, 0x333333, 0x222222);
  scene.add(grid);

  // x-axis: red
  // y-axis: green
  // z-axis: blue
  const axes = new THREE.AxesHelper(300);
  scene.add(axes);

  return scene;
}
