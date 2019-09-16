import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		editUser: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { user } = request;
			const { avatar, username, email, firstName, lastName, bio } = args;
			try {
				return prisma.updateUser({
					where: { id: user.id },
					data: {
						avatar,
						username,
						email,
						firstName,
						lastName,
						bio
					}
				});
			} catch (error) {
				console.log(error);
			}
		}
	}
};
