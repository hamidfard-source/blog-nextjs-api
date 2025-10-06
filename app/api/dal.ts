import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'
import { decrypt } from './session'
import { redirect } from 'next/navigation'
import { SessionPayload } from './definitions'

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie);

    console.log('verifySession() Part| dal.ts ==>', session)

    if(!session?.userId){
        redirect('/login')
    }

    // return { isAuth: true, userId: session.userId, role: session.role }
    return session as SessionPayload
})

// ✅ checking member role
export function hasRole(session: SessionPayload, allowedRoles: string[]): boolean {
    return allowedRoles.includes(session.role)
}

// helper functions for checking new roles
export const isOwner = async () => {
    const session = await verifySession();
    return session.role === "owner";
}

export const isAdmin = async () => {
    const session = await verifySession();
    return session.role === 'admin' || session.role === 'owner';
}

export const isUser = async () => {
    const session = await verifySession();
    return session.role === 'user';
}

// ✅ middleware برای API routes
export async function requireRole(allowedRoles: string[]) {
    const session = await verifySession()
    
    if (!hasRole(session, allowedRoles)) {
        throw new Error('Access denied: Insufficient permissions')
    }
    
    return session
}