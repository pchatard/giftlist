export function getDateFromNow(days: number = 0): Date {
	const current = new Date();
	current.setDate(current.getDate() + days);
	return current;
}
