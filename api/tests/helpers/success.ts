import { expect } from "chai";

function success(response: ChaiHttp.Response, successCode: number) {
	expect(response).to.have.property("error").to.eql(false);
	expect(response).to.have.status(successCode);
}

export function expect200(response: ChaiHttp.Response) {
	success(response, 200);
}

export function expect204(response: ChaiHttp.Response) {
	success(response, 204);
}
