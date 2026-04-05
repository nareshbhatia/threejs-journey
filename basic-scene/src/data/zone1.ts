import { AirspaceZone } from '../types/AirspaceZone';

export const zone1: AirspaceZone = {
  id: 'zone-1-mission',
  name: 'Zone 1: Solar Farm (Mission)',
  type: 'mission',
  color: '#3b82f6',
  opacity: 0.55,
  ceilingHeightM: 50,
  footprint: [
    { lng: -105.1501, lat: 40.5938, floorMetersAgl: 0 },
    { lng: -105.1448, lat: 40.5939, floorMetersAgl: 100 },
    { lng: -105.1448, lat: 40.5902, floorMetersAgl: 0 },
    { lng: -105.1466, lat: 40.5902, floorMetersAgl: 0 },
    { lng: -105.1501, lat: 40.5922, floorMetersAgl: 0 },
    { lng: -105.1501, lat: 40.5938, floorMetersAgl: 0 },
  ],
};
