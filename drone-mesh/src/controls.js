import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true; // smooth inertia on release
  controls.dampingFactor = 0.05;
  return controls;
}
