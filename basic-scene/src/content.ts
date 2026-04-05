import * as THREE from 'three';

import { route1 } from './data/route1.js';
import { zone1 } from './data/zone1.js';
import { createRouteGeometry } from './route.js';
import { createZoneGeometry } from './zone.js';

export function createContent(): THREE.Group {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.7,
    roughness: 0.3,
    transparent: true,
    opacity: 0.6,
  });

  const zoneMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(zone1.color),
    transparent: true,
    opacity: zone1.opacity,
    metalness: 0.15,
    roughness: 0.75,
    side: THREE.DoubleSide,
  });

  // BoxGeometry(width, height, depth)
  const box1 = new THREE.Mesh(new THREE.BoxGeometry(200, 30, 100), bodyMat);
  box1.position.set(-300, 15, 50);
  group.add(box1);

  // CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
  const cylinder1 = new THREE.Mesh(
    new THREE.CylinderGeometry(50, 50, 60, 32),
    bodyMat,
  );
  cylinder1.position.set(-100, 30, 50);
  group.add(cylinder1);

  // SphereGeometry(radius, widthSegments, heightSegments)
  const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 24), bodyMat);
  sphere1.position.set(-100, 130, 50);
  group.add(sphere1);

  const zoneGeo = createZoneGeometry(zone1);
  const zoneMesh = new THREE.Mesh(zoneGeo, zoneMat);
  group.add(zoneMesh);

  const routeGeo = createRouteGeometry(route1, {
    originLat: zone1.footprint[0].lat,
    originLng: zone1.footprint[0].lng,
  });
  const routeLine = new THREE.Line(
    routeGeo,
    new THREE.LineBasicMaterial({ color: 0x22c55e }),
  );
  group.add(routeLine);

  return group;
}
