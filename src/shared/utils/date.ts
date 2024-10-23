export const stringDateGreater = (d1: string, d2:string) => {
	const date1 = new Date(d1);
	const date2 = new Date(d2);

	return date1.getTime() > date2.getTime();
};