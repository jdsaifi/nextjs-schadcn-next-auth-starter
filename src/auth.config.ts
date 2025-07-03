import type { NextAuthConfig, Session } from 'next-auth';

export const authConfig = {
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            // Attach JWT from Express or Google access token
            if (user) {
                token.user = user?.userInfo;
                token.jwt = user?.token || token.jwt;
            }
            return token;
        },
        async session({ session, token }) {
            (session as Session).user = token.user as Record<string, unknown>;
            (session as Session).jwt = token.jwt as string | undefined;
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isLoginPage = nextUrl.pathname === '/login';

            // 1. Not logged in → redirect to /login (unless already on /login)
            if (!isLoggedIn && !isLoginPage) {
                return Response.redirect(new URL('/login', nextUrl));
            }

            // 2. Logged in and trying to visit /login → redirect to /dashboard
            if (isLoggedIn && isLoginPage) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            // 3. All other cases: allow
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
