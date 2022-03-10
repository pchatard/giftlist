import "mocha";

import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";

import { isValidEmail, isValidUUID } from "../../src/helpers/validators";

export default function suite() {
	it("Validate UUID", async () => {
		expect(isValidUUID(uuidv4())).to.be.equal(true);
		expect(isValidUUID("")).to.be.equal(false);
		expect(isValidUUID("test-test-test-test")).to.be.equal(false);
	});
	it("Validate email", async () => {
		expect(isValidEmail("")).to.be.equal(false);
		expect(isValidEmail("test.test")).to.be.equal(false);
		expect(isValidEmail("test@")).to.be.equal(false);
		expect(isValidEmail("@test.fr")).to.be.equal(false);
		expect(isValidEmail("test@test")).to.be.equal(false);
		expect(isValidEmail("test@test.fr")).to.be.equal(true);
	});
}
