import { cookies } from "next/headers";
import { NextRequest , NextResponse } from "next/server";
import { decrypt } from "./app/api/session";

// routes
const publicRoutes = ['/login','/signup']
const protectedRoutes = ['/dashboard']
const ownerRoutes = ['/dashboard/alluser']
const adminRoutes = ['/dashboard/categories']

interface Session extends Record<string,unknown> {
  userId?: string,
  role?: string
};

type RouteRule = {
  match: (path: string) => boolean;
  resolveRedirect: (session: Session | null) => string | null;
};

const createExactMatcher = (routes: string[]) => (path: string) =>
  routes.includes(path);

const createPrefixMatcher = (routes: string[]) => (path: string) =>
  routes.some((route) => path.startsWith(route));

const routeRules: RouteRule[] = [
    {
        match: createPrefixMatcher(ownerRoutes),
        resolveRedirect: (session) =>
            session?.role === "owner" ? null : "/login"
    },
    {
        match: createPrefixMatcher(adminRoutes),
        resolveRedirect: (session) =>
            session?.role === "admin" || session?.role === "owner"
                ? null
                : "/login"
    },
    {
        match: createExactMatcher(protectedRoutes),
        resolveRedirect: (session) =>
            session?.userId ? null : "/login",
    },
    {
        match: createExactMatcher(publicRoutes),
        resolveRedirect: (session) =>
            session?.userId ? "/dashboard" : null,
    }
]



export default async function middleware(req: NextRequest){
    const path = req.nextUrl.pathname;
    const cookie = (await cookies()).get('session')?.value ?? null;
    const session = cookie ? await decrypt(cookie) : null;
    
    for(const rule of routeRules){
        if(!rule.match(path)) continue;

        const redirectTarget = rule.resolveRedirect(session);
        if(!redirectTarget) break;

        return NextResponse.redirect(new URL(redirectTarget,req.nextUrl))
    }

    return NextResponse.next()
}

export const config ={
    matcher:['/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',],
}