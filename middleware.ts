import { cookies } from "next/headers";
import { NextRequest , NextResponse } from "next/server";
import { decrypt } from "./app/api/session";

// route private
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login','/signup']

export default async function middleware(req: NextRequest){
    // check route
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // cookie
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    // redirect to /login 
    // console.log(session);
    
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect( new URL('/login', req.nextUrl) )
    }

    if(isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/dashboard',req.nextUrl))
    }

    return NextResponse.next()
}

// machter
export const confing ={
    matcher:['/((?!api|_next/static|_next/image|.*\\.png$).*)',],
}