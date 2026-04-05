import type { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createControls(
  camera: Camera,
  domElement: HTMLElement,
): OrbitControls {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true; // smooth inertia on release of mouse button
  controls.dampingFactor = 0.05; // how quickly the camera comes to a stop
  return controls;
}
