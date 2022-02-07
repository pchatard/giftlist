import "mocha";
import chai from "chai";
import server from "./../../src/index";
import { GlobalVar } from "./../global";

export const get = async (url: string): Promise<ChaiHttp.Response> =>
	await chai
		.request(server)
		.get(url)
		.set({ Authorization: `Bearer ${GlobalVar.Token}` });

export const post = async (url: string, data?: string | object): Promise<ChaiHttp.Response> =>
	await chai
		.request(server)
		.post(url)
		.send(data)
		.set({ Authorization: `Bearer ${GlobalVar.Token}` });

export const put = async (url: string, data?: string | object): Promise<ChaiHttp.Response> =>
	await chai
		.request(server)
		.put(url)
		.send(data)
		.set({ Authorization: `Bearer ${GlobalVar.Token}` });

export const del = async (url: string): Promise<ChaiHttp.Response> =>
	await chai
		.request(server)
		.delete(url)
		.set({ Authorization: `Bearer ${GlobalVar.Token}` });
