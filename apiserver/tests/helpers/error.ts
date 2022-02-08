import "chai-http";
import { expect } from "chai";
import APIError from "./../../src/errors/APIError";

function error(response: ChaiHttp.Response, errorCode: number) {
	expect(response).to.have.property("error").to.not.eql(false);
	expect(response).to.have.status(errorCode);
}

export function expectError(response: ChaiHttp.Response, errorCode: number, errorMessage: string) {
	error(response, errorCode);
	expect(response).to.have.property("body").to.have.property("message").to.be.eql(errorMessage);
}

export function expectValidationFailed(response: ChaiHttp.Response) {
	expectError(response, 422, "Validation Failed");
	expect(response).to.have.property("body").to.have.property("details").to.be.not.null;
}

export function expect500(response: ChaiHttp.Response, apiError: APIError) {
	error(response, 500);
	expect(response)
		.to.have.property("body")
		.to.be.deep.equal({ name: apiError.name, message: apiError.message });
}
