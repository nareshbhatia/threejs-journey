import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ------------------------ Lights ------------------------
function addLights(scene) {
  // AmbientLight — illuminates all surfaces equally from all directions.
  // No shadows. Use as a base fill to prevent pure-black shadows.
  const ambient = new THREE.AmbientLight(0xffffff, 0.4); // color, intensity
  scene.add(ambient);

  // DirectionalLight — parallel rays, like the sun. Casts shadows.
  const sun = new THREE.DirectionalLight(0xffffff, 10.0);
  sun.position.set(-500, 1000, 500); // direction is from this position toward (0,0,0)
  scene.add(sun);

  // PointLight — radiates in all directions from a point, like a bulb.
  const point = new THREE.PointLight("orange", 10, 0, 0); // color, intensity, distance, decay
  point.position.set(300, 300, 300);
  scene.add(point);
}

// ------------------------ Camera ------------------------
function createCamera() {
  const camera = new THREE.PerspectiveCamera(75);
  camera.position.set(0, 1000, 1000);
  return camera;
}

// ------------------------ Drone ------------------------
function createDrone() {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a2e,
    metalness: 0.7,
    roughness: 0.3,
  });
  const rotorMat = new THREE.MeshStandardMaterial({
    color: 0x2196f3,
    metalness: 0.7,
    roughness: 0.5,
  });

  // Plate 1
  const plate1 = new THREE.Mesh(new THREE.BoxGeometry(200, 10, 200), bodyMat);
  plate1.position.y = 15; // 10 + 5 (half of arm height + half of plate height)
  group.add(plate1);

  const plate2 = new THREE.Mesh(new THREE.BoxGeometry(200, 10, 200), bodyMat);
  plate2.position.y = -15;
  group.add(plate2);

  const rotor1 = new THREE.Mesh(new THREE.CylinderGeometry(75, 75, 20), rotorMat);
  rotor1.position.set(-275, 20, -275) // position.y = 20 = 10 + 10 (half of arm height + half of rotor height)
  group.add(rotor1);

  const rotor2 = new THREE.Mesh(new THREE.CylinderGeometry(75, 75, 20), rotorMat);
  rotor2.position.set(275, 20, -275)
  group.add(rotor2);

  const rotor3 = new THREE.Mesh(new THREE.CylinderGeometry(75, 75, 20), rotorMat);
  rotor3.position.set(-275, 20, 275)
  group.add(rotor3);

  const rotor4 = new THREE.Mesh(new THREE.CylinderGeometry(75, 75, 20), rotorMat);
  rotor4.position.set(275, 20, 275)
  group.add(rotor4);

  // Arm 1: Created with its axis in Y direction, so vertical
  const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 290), bodyMat);
  // Rotate 90 degrees around Z axis to make it horizontal (in XZ plane)
  arm1.rotation.z = Math.PI / 2
  // Rotate -45 degrees around Y axis to make it diagonal
  arm1.rotation.y = -Math.PI / 4
  // Position the center to be at the midpoint of the rotor and the corner of the plate
  arm1.position.set(-175, 0, -175)
  group.add(arm1)

  const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 290), bodyMat);
  arm2.rotation.z = Math.PI / 2
  arm2.rotation.y = Math.PI / 4
  arm2.position.set(175, 0, -175)
  group.add(arm2)

  const arm3 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 290), bodyMat);
  arm3.rotation.z = Math.PI / 2
  arm3.rotation.y = -Math.PI / 4
  arm3.position.set(175, 0, 175)
  group.add(arm3)

  const arm4 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 290), bodyMat);
  arm4.rotation.z = Math.PI / 2
  arm4.rotation.y = Math.PI / 4
  arm4.position.set(-175, 0, 175)
  group.add(arm4)

  return group;
}

// ------------------------ Main ------------------------

// Create scene
const scene = new THREE.Scene();

// Add grid
const grid = new THREE.GridHelper(1000, 20, 0x333333, 0x222222)
// scene.add(grid)

// Add axes: Red = X, Green = Y, Blue = Z
const axes = new THREE.AxesHelper(300)
// scene.add(axes)

// Add lights
addLights(scene);

// Add camera
const camera = createCamera();
scene.add(camera);

// Add drone
const drone = createDrone();
scene.add(drone);

// Create renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

function setSizes() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Set initial size on load
setSizes();

// Set sizes on window resize
window.addEventListener("resize", setSizes);

// Create controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth inertia on release
controls.dampingFactor = 0.05;

// ------------------------ Animation Loop ------------------------
const timer = new THREE.Timer();

function animate() {
  // Recursive call to animate during the next frame
  requestAnimationFrame(animate);

  timer.update();
  const t = timer.getElapsed();

  // Hover: gentle sinusoidal Y oscillation
  // time = t, frequency = 1.5, amplitude = 20
  drone.position.y = Math.sin(t * 1.5) * 20;

  // Slow yaw rotation
  drone.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

animate();
