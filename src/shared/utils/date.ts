export const MINUTE_MS = 60_000;
export const HOUR_MS = 3_600_000;
export const DAY_MS = 86_400_000;

export const stringDateGreater = (d1: string | Date, d2: string | Date) => {
	const date1 = new Date(d1);
	const date2 = new Date(d2);

	return date1.getTime() > date2.getTime();
};