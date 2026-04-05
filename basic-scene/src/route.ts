import * as THREE from 'three';

import { toEnuMeters } from './coordinates.js';
import type { Waypoint } from './types/Waypoint.js';

export interface CreateRouteGeometryOptions {
  /**
   * ENU origin (deg). Defaults to the first waypoint (after sorting by `sequence`).
   * Set to e.g. a zone footprint corner so the route lines up with other scene content.
   */
  originLat?: number;
  originLng?: number;
}

/**
 * Polyline through waypoints in order of `sequence`.
 * Three.js Y-up: horizontal ground is the XZ plane; altitude is +Y.
 * Use `Vector3(east, altM, north)` — do not use `(east, north, altM)` or the route lies in XY.
 */
export function createRouteGeometry(
  waypoints: Waypoint[],
  options?: CreateRouteGeometryOptions,
): THREE.BufferGeometry {
  const sorted = [...waypoints].sort((a, b) => a.sequence - b.sequence);
  if (sorted.length < 2) {
    throw new Error('Route needs at least two waypoints');
  }

  const originLat = options?.originLat ?? sorted[0].lat;
  const originLng = options?.originLng ?? sorted[0].lng;

  const points = sorted.map((wp) => {
    const { east, north } = toEnuMeters(originLat, originLng, wp.lat, wp.lng);
    return new THREE.Vector3(east, wp.altM, north);
  });

  return new THREE.BufferGeometry().setFromPoints(points);
}
