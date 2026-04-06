import * as THREE from "three";

/** ---------- References ---------- */
// Three.js website: https://threejs.org/
// Three.js manual: https://threejs.org/manual/
// Three.js API docs: https://threejs.org/docs/
// Fundamentals: https://threejs.org/manual/#en/fundamentals
// Creating a Scene: https://threejs.org/manual/#en/creating-a-scene

/** ---------- Concepts ---------- */
// To display objects with three.js, we need the following things:
//   1. A scene
//   2. A camera
//   3. One or more lights (ambient, directional, point) (only if using lit materials)
//   4. One or more meshes (geometry + material)
//   5. A renderer
//   6. Controls to interact with the scene, e.g. orbit controls (optional)

// Note that the scene and the camera are independent objects. The camera is not added
// to the scene. The two objects are connected by the renderer. The renderer renders
// the scene from the camera's perspective:
//   renderer.render(scene, camera);

/** ---------- Three.js Coordinate System ---------- */
// x-axis points to the right (positive x is to the right)
// y-axis points up (positive y is up)
// z-axis points toward the viewer (positive z comes out of the screen)

// The origin is at (0, 0, 0) – it’s the reference point for all positions.
// Objects often start here, you can move them to other positions by translating them.

// By default, PerspectiveCamera sits at the origin, looks along negative z, i.e. looking into the scene.

/** ---------- Scene ---------- */
// Create a scene
// A Scene is a container for all the objects, lights, and cameras in our 3D world.
const scene = new THREE.Scene();

/** ---------- Camera ---------- */
// Sizes (in pixels) shared by camera and renderer
const sizes = { width: 800, height: 600 };

// Create a camera
// A camera is a device that captures the scene and projects it onto a 2D surface.
// fov: vertical field of view (in degrees)
// aspectRatio: the ratio of the width to the height of the camera
// near: the distance from the camera to the near plane (in world units)
// far: the distance from the camera to the far plane (in world units)
const fov = 75;
const aspectRatio = sizes.width / sizes.height;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

// Position the camera towards the viewer (positive z), still looking into the scene.
camera.position.z = 3;

/** ---------- Box Mesh ---------- */
// Create a geometry
// A geometry is a shape that defines the shape of an object.
// BoxGeometry(width, height, depth)
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Create a material
// A material is a object that defines the appearance of an object.
// MeshBasicMaterial just colors the surface of the object.
// It ignores lights entirely and draws the mesh using the material’s color
// (and textures if you use them) with no shading from scene lights.
// If you want lights to affect how the surface looks, add a lit material like
// MeshStandardMaterial or MeshLambertMaterial + Light objects to the scene.
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create a mesh
// A mesh is a geometry + material combined into one drawable object.
const mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);

/** ---------- Renderer ---------- */
// Select the <canvas> element that will host WebGL output
const canvas = document.querySelector("canvas.webgl");

// WebGL renderer that draws into the DOM canvas we selected
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

// Size the renderer (a.k.a. the drawing buffer) to match our chosen width and height
renderer.setSize(sizes.width, sizes.height);

// Render the scene once as seen from the camera
renderer.render(scene, camera);
