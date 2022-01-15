/**
 * Remove blank property from object.
 * TODO: Do we really need it ? With Partial<T> add blank property in our case
 * @param {T} obj the object to clean
 * @returns the cleaned object
 */
export function cleanObject<T>(obj: T): T {
	let res: any = {};
	for (var propName in obj) {
		// @ts-ignore
		if (obj[propName] !== null && obj[propName] !== undefined && obj[propName] !== "") {
			res[propName] = obj[propName];
		}
	}
	return res;
}
