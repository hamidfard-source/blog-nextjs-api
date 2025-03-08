import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'
import { decrypt } from './session'
import { redirect } from 'next/navigation'



export const verifySessoin = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie);

    if(!session?.userid){
        redirect('/login')
    }

    return {isAuth: true,userId: session.userId}
})  