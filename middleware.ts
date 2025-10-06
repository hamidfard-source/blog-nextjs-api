import { cookies } from "next/headers";
import { NextRequest , NextResponse } from "next/server";
import { decrypt } from "./app/api/session";

// route private
const protectedRoutes = ['/dashboard']
const ownerRoutes = ['/dashboard/alluser']
const adminRoutes = ['/dashboard/categories']

const publicRoutes = ['/login','/signup']

export default async function middleware(req: NextRequest){
    // check route
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    const isAdminRoute = adminRoutes.some(route => path.startsWith(route))
    const isOwnerRoute = ownerRoutes.some(route => path.startsWith(route)) 

    // cookie
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    console.log('session in middleware', session)

    // if login without session 
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // No session - continue
    if (!session?.userId) {
        return NextResponse.next()
    }

    // 🔒 فقط Owner می‌تونه به alluser دسترسی داشته باشه
    if (isOwnerRoute && session.role !== 'owner') {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    // 🔓 Admin و Owner به categories دسترسی دارن
    if (isAdminRoute && session.role !== 'admin' && session.role !== 'owner') {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    // ✅ هدایت لاگین‌شده‌ها از صفحات عمومی
    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// machter
export const confing ={
    matcher:['/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',],
}