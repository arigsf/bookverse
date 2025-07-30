export interface Login {
	email: string;
	password: string;
}

export interface UpdateAccount {
	email?: string;
	name?: string;
	password?: string;
	active?: boolean;
}