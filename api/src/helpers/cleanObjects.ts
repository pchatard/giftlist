/**
 * Remove undefined, null and "__promise_xxxx__" properties from object.
 * @param {T} obj the object to clean
 * @returns the cleaned object
 */
export function cleanObject<T>(obj: T): T {
	let res: any = {};
	for (var propName in obj) {
		if (
			!propName.includes("__promise") &&
			obj[propName] !== undefined &&
			obj[propName] !== null
		) {
			res[propName] = obj[propName];
		}
	}
	return res;
}
