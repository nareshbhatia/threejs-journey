import * as THREE from "three";

export function addLights(scene) {
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
