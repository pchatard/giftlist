import "mocha";

import { expect } from "chai";

import { cleanObject } from "../../src/helpers/cleanObjects";

export default function suite() {
	it("Clean undefined", async () => {
		expect(cleanObject({ a: "a", b: undefined })).to.be.deep.equal({ a: "a" });
	});
	it("Clean null", async () => {
		expect(cleanObject({ a: "a", b: null })).to.be.deep.equal({ a: "a" });
	});
	it("Clean __promise", async () => {
		expect(cleanObject({ a: "a", __promiseA: "promise" })).to.be.deep.equal({ a: "a" });
	});
}
