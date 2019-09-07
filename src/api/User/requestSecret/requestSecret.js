import { genelateSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		requestSecret: async (_, args, { request }) => {
			console.log('request: ', request.user);
			throw Error();
			const { email } = args;
			const loginSecret = genelateSecret();
			console.log(loginSecret);
			try {
				await sendSecretMail(email, loginSecret);
				await prisma.updateUser({ data: { loginSecret }, where: { email } });
				return true;
			} catch (error) {
				console.log('error: ', error);
				return false;
			}
		}
	}
};
