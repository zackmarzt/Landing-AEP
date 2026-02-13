import { auth } from "@/auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    const isDashboardRoute = nextUrl.pathname.startsWith("/admin");
    const isAuthRoute = nextUrl.pathname.startsWith("/admin/login");

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/admin", nextUrl));
        }
        return;
    }

    if (isDashboardRoute) {
        if (!isLoggedIn) {
            return Response.redirect(new URL("/admin/login", nextUrl));
        }
        return;
    }

    return;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
