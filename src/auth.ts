import NextAuth, { User } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import axiosClient from './axiosClient';
import { ILoginResponse, IUser } from './types';

async function getUser(email: string, password: string) {
    try {
        const res = await axiosClient.post('/users/login', { email, password });
        return res.data;
    } catch (error) {
        console.log('error:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user: ILoginResponse = await getUser(email, password);

                    if (!user) return null;

                    if (user.status === 'success') {
                        const userInfo = user.data[0].user;
                        return {
                            id: userInfo._id,
                            name: userInfo.name,
                            email: userInfo.email,
                            token: user.data[0].token,
                            userInfo,
                        } as User & { userInfo: IUser };
                    }
                }
                return null;
            },
        }),
    ],
});
