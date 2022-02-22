/**
 * Stringified email.
 * See [Email Regex](https://emailregex.com/) and [RFC 5322](https://tools.ietf.org/html/rfc5322)
 * @pattern (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))
 * @format email
 */
export type email = string;
