/* eslint-disable security/detect-object-injection */
/**
 * Remove undefined, null and "__promise_xxxx__" properties from object.
 * @param {T} obj the object to clean
 * @returns the cleaned object
 */
export function cleanObject<T>(obj: T, propsToDelete: string[] = []): T {
	const res: T = {} as T;
	for (const propName in obj) {
		if (
			!propName.includes("__promise") &&
			!propsToDelete?.includes(propName) &&
			obj[propName] !== undefined &&
			obj[propName] !== null
		) {
			res[propName] = obj[propName];
		}
	}
	return res;
}
