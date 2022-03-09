import { expect } from "chai";

import { Url_ListGetAll } from "../global";
import { get } from "../helpers/crud";
import { expect200 } from "../helpers/success";
import { ListGranted, ListOwned } from "../seeder/lists.seed";
import { castArrayAsListDTO, ListTestAsList } from "./cast";

export default function suite() {
	it("Returns 200, with all lists", async () => {
		const response = await get(Url_ListGetAll("all"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.be.deep.equal(
			castArrayAsListDTO([ListOwned, ListGranted, ListTestAsList()])
		);
	});
	it("Returns 200, with owned lists", async () => {
		const response = await get(Url_ListGetAll("owned"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.be.deep.equal(castArrayAsListDTO([ListOwned, ListTestAsList()]));
	});
	it("Returns 200, with granted lists", async () => {
		const response = await get(Url_ListGetAll("granted"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.be.deep.equal(castArrayAsListDTO([ListGranted]));
	});
}
