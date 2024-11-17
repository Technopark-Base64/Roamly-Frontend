export const defaultTripName = (city?: string) => {
	if (!city)
		return 'Поездка';

	if (city.at(-1) === 'а')
		city = city.slice(0, -1) + 'у';

	if (city.at(-1) === 'я')
		city = city.slice(0, -1) + 'ю';

	return `Поездка в ${city}`;
};

export const formatMembersNumber = (num: number) => {
	num = Math.floor(num);

	const ones = Number(num.toString().at(-1));
	const tens = Number(num.toString().at(-2));

	if (tens === 1) {
		return `${num} Участников`;
	}
	if (ones === 1) {
		return `${num} Участник`;
	}
	if (ones > 1 && ones < 5) {
		return `${num} Участника`;
	}
	return `${num} Участников`;
};
