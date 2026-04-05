import earcut from 'earcut';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { toEnuMeters } from './coordinates.js';
import type {
  AirspaceZone,
  AirspaceZoneFootprintPoint,
} from './types/AirspaceZone.js';

function nearlySameLngLat(
  a: AirspaceZoneFootprintPoint,
  b: AirspaceZoneFootprintPoint,
): boolean {
  return Math.abs(a.lng - b.lng) < 1e-8 && Math.abs(a.lat - b.lat) < 1e-8;
}

/** Drop repeated closing vertex when it duplicates the first. */
function normalizeFootprintRing(
  points: AirspaceZoneFootprintPoint[],
): AirspaceZoneFootprintPoint[] {
  if (points.length < 2) return points;
  const first = points[0];
  const last = points[points.length - 1];
  if (points.length > 3 && nearlySameLngLat(first, last)) {
    return points.slice(0, -1);
  }
  return points;
}

interface LocalVertex {
  x: number;
  y: number;
  z: number;
}

/** ENU-style meters: origin at first point, x east, y up (floor AGL), z north. */
function footprintToLocalVertices(
  ring: AirspaceZoneFootprintPoint[],
): LocalVertex[] {
  const origin = ring[0];
  return ring.map((p) => {
    const { east, north } = toEnuMeters(origin.lat, origin.lng, p.lat, p.lng);
    const y = p.floorMetersAgl;
    return { x: east, y, z: north };
  });
}

function makeIndexedBufferGeometry(
  positions: number[],
  indices: number[],
): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  return geo;
}

/**
 * Builds a closed volume: triangulated floor & ceiling in XZ, plus quads for each wall.
 */
export function createZoneGeometry(zone: AirspaceZone): THREE.BufferGeometry {
  const ring = normalizeFootprintRing(zone.footprint);
  const n = ring.length;

  if (n < 3) {
    throw new Error(`Zone "${zone.id}" needs at least 3 footprint vertices`);
  }

  const vertices = footprintToLocalVertices(ring);
  const flatXZ: number[] = [];
  for (const v of vertices) {
    flatXZ.push(v.x, v.z);
  }

  const triVertexIndices = earcut(flatXZ);
  if (triVertexIndices.length === 0) {
    throw new Error(`Zone "${zone.id}" footprint could not be triangulated`);
  }

  const posFloor: number[] = [];
  const posCeil: number[] = [];
  for (const v of vertices) {
    posFloor.push(v.x, v.y, v.z);
    posCeil.push(v.x, v.y + zone.ceilingHeightM, v.z);
  }

  const geoFloor = makeIndexedBufferGeometry(posFloor, [...triVertexIndices]);
  const geoCeil = makeIndexedBufferGeometry(posCeil, [...triVertexIndices]);

  const posWall: number[] = [];
  const idxWall: number[] = [];

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const a = vertices[i];
    const b = vertices[j];
    const ay = a.y + zone.ceilingHeightM;
    const by = b.y + zone.ceilingHeightM;
    const base = posWall.length / 3;
    posWall.push(a.x, a.y, a.z, b.x, b.y, b.z, b.x, by, b.z, a.x, ay, a.z);
    idxWall.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }

  const geoWall = makeIndexedBufferGeometry(posWall, idxWall);

  const merged = mergeGeometries([geoFloor, geoCeil, geoWall], false);
  merged.computeVertexNormals();
  return merged;
}
