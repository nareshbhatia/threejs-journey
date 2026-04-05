import * as THREE from 'three';
import type { FrameUpdateFn } from './types.js';

export function createDrone(): THREE.Group {
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

  const rotor1 = new THREE.Mesh(
    new THREE.CylinderGeometry(75, 75, 20),
    rotorMat,
  );
  rotor1.position.set(-275, 20, -275); // position.y = 20 = 10 + 10 (half of arm height + half of rotor height)
  group.add(rotor1);

  const rotor2 = new THREE.Mesh(
    new THREE.CylinderGeometry(75, 75, 20),
    rotorMat,
  );
  rotor2.position.set(275, 20, -275);
  group.add(rotor2);

  const rotor3 = new THREE.Mesh(
    new THREE.CylinderGeometry(75, 75, 20),
    rotorMat,
  );
  rotor3.position.set(-275, 20, 275);
  group.add(rotor3);

  const rotor4 = new THREE.Mesh(
    new THREE.CylinderGeometry(75, 75, 20),
    rotorMat,
  );
  rotor4.position.set(275, 20, 275);
  group.add(rotor4);

  // Arm 1: Created with its axis in Y direction, so vertical
  const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 290), bodyMat);
  // Rotate 90 degrees around Z axis to make it horizontal (in XZ plane)
  arm1.rotation.z = Math.PI / 2;
  // Rotate -45 degrees around Y axis to make it diagonal
  arm1.rotation.y = -Math.PI / 4;
  // Position the center to be at the midpoint of the rotor and the corner of the plate
  arm1.position.set(-175, 0, -175);
  group.add(arm1);

  const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 290), bodyMat);
  arm2.rotation.z = Math.PI / 2;
  arm2.rotation.y = Math.PI / 4;
  arm2.position.set(175, 0, -175);
  group.add(arm2);

  const arm3 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 290), bodyMat);
  arm3.rotation.z = Math.PI / 2;
  arm3.rotation.y = -Math.PI / 4;
  arm3.position.set(175, 0, 175);
  group.add(arm3);

  const arm4 = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 290), bodyMat);
  arm4.rotation.z = Math.PI / 2;
  arm4.rotation.y = Math.PI / 4;
  arm4.position.set(-175, 0, 175);
  group.add(arm4);

  return group;
}

/** Hover + slow yaw; pass to the animation loop's `updatables` list. */
export function createDroneUpdater(drone: THREE.Group): FrameUpdateFn {
  return (elapsed: number) => {
    // Hover: gentle sinusoidal Y oscillation — frequency 1.5, amplitude 20
    drone.position.y = Math.sin(elapsed * 1.5) * 20;
    // Slow yaw rotation
    drone.rotation.y += 0.005;
  };
}
