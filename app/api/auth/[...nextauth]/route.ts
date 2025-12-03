import NextAuth from 'next-auth';

import { authOptions } from '@/app/lib/utils/auth_utils';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
