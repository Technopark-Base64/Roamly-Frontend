export const defaultTripName = (city: string) => {
	if (city.at(-1) === 'а')
		city = city.slice(0, -1) + 'у';

	if (city.at(-1) === 'я')
		city = city.slice(0, -1) + 'ю';

	return `Поездка в ${city}`;
};
