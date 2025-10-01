import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    nickname: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      nickname: string;
      accessToken: string;
      refreshToken: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
  }
}
