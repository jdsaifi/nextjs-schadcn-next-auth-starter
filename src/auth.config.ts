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
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
