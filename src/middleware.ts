import type { MiddlewareHandler } from 'astro';

// import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'; // disabled: not configured for prod yet
// const isProtected = createRouteMatcher(['/account(.*)']);

// Disabled: not configured for prod yet (no Clerk-backed auth).
export const onRequest: MiddlewareHandler = (_context, next) => next();

// export const onRequest = clerkMiddleware((auth, context) => {
// 	if (isProtected(context.request)) {
// 		const { userId } = auth();
// 		if (!userId) {
// 			return Response.redirect(new URL('/sign-in', context.request.url));
// 		}
// 	}
// });
