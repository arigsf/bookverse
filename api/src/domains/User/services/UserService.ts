import prisma from "../../../../config/prismaClient";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { InvalidParamError } from "../../../../errors/InvalidParamError";

class UserService {
	async encryptPassword(password: string){
		return await hash(password, 10);
	}

	async create(user: User){
		const alreadyExist = await prisma.user.findFirst({
			where: {
				email: user.email,
			},
		});

		if (alreadyExist) {
			throw new InvalidParamError("Email já cadastrado.");
		}

		user.password = await this.encryptPassword(user.password);

		const newUser = await prisma.user.create({
			data: user,
		});

		return newUser;
	}
}

export default new UserService();