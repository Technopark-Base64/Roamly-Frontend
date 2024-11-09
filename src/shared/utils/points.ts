type TPoint = {
  lat: number,
  lng: number,
}

export const getLength = (p1: TPoint, p2: TPoint ) => {
	// 1 deg on map === 111,111 km
	return Math.sqrt((p1.lng - p2.lng)**2 + (p1.lat - p2.lat)**2) * 111.111 * 1000;
};
