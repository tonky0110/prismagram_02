import { prisma } from '../../../generated/prisma-client';

export default {
	User: {
		fullName: (parent) => {
			return `${parent.firstName} ${parent.lastName}`;
		},
		isFollowing: async (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			try {
				console.log('parent: ', parent);
				console.log('user: ', user);
				return prisma.$exists.user({
					AND: [ { id: user.id }, { following_some: { id: parentId } } ]
				});
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		isSelf: (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			return user.id === parentId;
		}
	},
	Post: {
		isLiked: (parent, _, { request }) => {
			const { user } = request;
			const { id } = parent;
			return prisma.$exists.like({
				AND: [
					{
						user: {
							id: user.id
						}
					},
					{
						post: {
							id
						}
					}
				]
			});
		}
	}
};
