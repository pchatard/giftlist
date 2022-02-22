// TODO: Follow https://github.com/lukeautry/tsoa/issues/911 to remove this workaround
type Expand<T> = { [K in keyof T]: T[K] };

export default Expand;
