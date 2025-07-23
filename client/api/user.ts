import { api } from ".";

export async function login(credentials: { email: string, password: string }) {
	try {
		const res = await api.post("/user/login", credentials);
		return res.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function logout() {
	try {
		await api.post("/user/logout");
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function myAccount() {
	try {
		const res = await api.get("/user/account");
		return res.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}