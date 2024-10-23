import { BACKEND_API_URL } from 'src/shared/config';

export const getPlacePhoto = (photoRef: string) => {
	return `${BACKEND_API_URL}/place/photo?reference=${photoRef}`;
};
