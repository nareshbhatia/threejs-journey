/** Earth radius for small-area ENU approximation (m). */
export const EARTH_RADIUS_M = 6371000;

/**
 * Local tangent plane meters from an origin (deg): east (+X), north (+Z).
 * For Three.js Y-up, map to `Vector3(east, altitudeMeters, north)` — not
 * `Vector3(east, north, altitude)` (that puts north on +Y and lays the path in XY).
 */
export function toEnuMeters(
  originLatDeg: number,
  originLngDeg: number,
  latDeg: number,
  lngDeg: number,
): { east: number; north: number } {
  const lat0 = (originLatDeg * Math.PI) / 180;
  const lng0 = (originLngDeg * Math.PI) / 180;
  const lat = (latDeg * Math.PI) / 180;
  const lng = (lngDeg * Math.PI) / 180;
  const east = EARTH_RADIUS_M * (lng - lng0) * Math.cos(lat0);
  const north = EARTH_RADIUS_M * (lat - lat0);
  return { east, north };
}
