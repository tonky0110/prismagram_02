import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		seeUser: async (_, args, { request }) => {
			try {
				const { id } = args;
				return prisma.user({ id });
			} catch (error) {
				console.log(error);
			}
		}
	}
};
