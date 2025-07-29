import { api } from ".";
import type { UpdateAccount } from "../src/types/userTypes";

export async function login(credentials: { email: string, password: string }) {
	await api.post("/user/login", credentials);
}

export async function logout() {
	await api.post("/user/logout");
}

export async function myAccount() {

	const res = await api.get("/user/account");
	return res.data;
}

export async function updateAccount(data: UpdateAccount) {
	const res = await api.put("/user/account", data);
	return res.data;
}