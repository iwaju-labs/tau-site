import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtected = createRouteMatcher(['/account(.*)']);

export const onRequest = clerkMiddleware((auth, context) => {
	if (isProtected(context.request)) {
		const { userId } = auth();
		if (!userId) {
			return Response.redirect(new URL('/sign-in', context.request.url));
		}
	}
});
