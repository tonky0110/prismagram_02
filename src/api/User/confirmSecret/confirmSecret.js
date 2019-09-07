import { prisma } from '../../../../generated/prisma-client';
import { genelateSecret, generateToken } from '../../../utils';

export default {
	Mutation: {
		confirmSecret: async (_, args, { request }) => {
			const { email, secret } = args;
			console.log('request: ', request);
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
