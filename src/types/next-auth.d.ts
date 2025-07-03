import { DefaultSession } from 'next-auth';
// import { JWT } from 'next-auth/jwt';

// declare module 'next-auth' {
//     interface User {
//         userInfo?: Record<string, unknown>;
//         token?: string;
//     }
//     interface Session {
//         user: Record<string, unknown>;
//         jwt?: string;
//     }
// }

// declare module 'next-auth/jwt' {
//     interface JWT {
//         user?: Record<string, unknown>;
//         jwt?: string;
//     }
// }

declare module 'next-auth' {
    interface Session {
        user: Record<string, unknown> & DefaultSession['user'];
        jwt?: string;
    }

    interface User {
        userInfo?: Record<string, unknown>;
        token?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user?: Record<string, unknown>;
        jwt?: string;
    }
}
