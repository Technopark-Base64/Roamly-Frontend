export const calculateInitialDate = (start: Date, end: Date) => {
	const now = new Date;

	if (now >= start && now <= end)
		return now;

	return start ?? undefined;
};