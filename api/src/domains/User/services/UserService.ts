import prisma from "../../../../config/prismaClient";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { NotAuthorizedError } from "../../../../errors/NotAuthorizedError";

class UserService {
	private async encryptPassword(password: string){
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
			data: { ...user },
		});

		return newUser;
	}

	async update(id: string, body: Partial<User>, currentUser: User){
		const existingUser = await prisma.user.findUnique({
			where: {
				id: id,
			}
		});

		if (!existingUser) {
			throw new InvalidParamError("Usuário com ID não encontrado.");
		}


		if (body.role && currentUser.role !== "ADMIN" || id !== currentUser.id && currentUser.role !== "ADMIN") {
			throw new NotAuthorizedError("Você não tem permissão para editar.");
		}

		if (body.password) {
			body.password = await this.encryptPassword(body.password);
		}

		if (body.email) {
			const emailExists = await prisma.user.findUnique({
				where: {
					email: body.email,
				},
			});

			if (emailExists) {
				throw new InvalidParamError("Email já está em uso.");
			}
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: id,
			},
			data: { ...body }
		});

		return updatedUser;
	}

	async delete(id: string, currentUser: User){
		const existingUser = await prisma.user.findUnique({
			where: {
				id: id,
			}
		});

		if (!existingUser) {
			throw new InvalidParamError("Usuário com ID não encontrado.");
		}

		if (currentUser.role !== "ADMIN") {
			throw new NotAuthorizedError("Você não tem permissão para deletar.");
		}

		const deletedUser = await prisma.user.delete({
			where: {
				id: id,
			}
		});

		return deletedUser;
	}
}

export default new UserService();