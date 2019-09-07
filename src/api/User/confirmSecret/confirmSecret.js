import { prisma } from '../../../../generated/prisma-client';
import { genelateSecret, generateToken } from '../../../utils';

export default {
	Mutation: {
		confirmSecret: async (_, args) => {
			const { email, secret } = args;
			try {
				const user = await prisma.user({ email });
				if (user.loginSecret === secret) {
					// returnJWT
					const token = generateToken(user.id);
					return token;
				} else {
					//
					throw Error('Wrong email/secret combination');
				}
			} catch (error) {
				console.log('confirmSecret.error - ', error);
			}
		}
	}
};
