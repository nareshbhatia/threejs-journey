import { Waypoint } from '../types/Waypoint';

/**
 * Mission route around zone1: stays just outside the footprint (~35–40 m buffer)
 * so the polyline does not cut through the zone volume.
 */
export const route1: Waypoint[] = [
  { sequence: 1, label: 'W1', lng: -105.14945, lat: 40.5943, altM: 0 },
  { sequence: 3, label: 'W3', lng: -105.14445, lat: 40.5943, altM: 0 },
  { sequence: 4, label: 'W4', lng: -105.14445, lat: 40.5964, altM: 100 },
  { sequence: 5, label: 'W5', lng: -105.14445, lat: 40.5982, altM: 0 },
  { sequence: 6, label: 'W6', lng: -105.14655, lat: 40.5982, altM: 0 },
  { sequence: 7, label: 'W7', lng: -105.14945, lat: 40.5979, altM: 150 },
  { sequence: 8, label: 'W8', lng: -105.14945, lat: 40.5964, altM: 0 },
];
