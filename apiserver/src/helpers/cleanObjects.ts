/**
 * Remove blank property from object.
 * TODO: Do we really need it ? With Partial<T> add blank property in our case
 * @param obj the object to clean
 * @returns the cleaned object
 */
export function cleanObject(obj: any): any {
	let res: any = {};
	for (var propName in obj) {
		if (obj[propName] !== null && obj[propName] !== undefined && obj[propName] !== "") {
			res[propName] = obj[propName];
		}
	}
	return res;
}
