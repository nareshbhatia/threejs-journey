import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/** Seconds since the animation loop started (from THREE.Timer). */
export type FrameUpdateFn = (elapsed: number) => void;

export interface RunLoopOptions {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  controls: OrbitControls;
  updatables: FrameUpdateFn[];
}
