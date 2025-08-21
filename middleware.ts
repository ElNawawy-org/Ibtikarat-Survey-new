import middleware from 'next-auth/middleware';

const config = {
  matcher: ['/researcher/:path*'], // protect /researcher and subroutes
};

export { middleware, config };
