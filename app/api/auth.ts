'use server'

import * as bcrypt from "bcrypt"
import { FormState, SignupFormSchema } from "./signupFormSchema"
import { createSession } from "./session"
import { redirect } from "next/navigation"
import { db } from "../db/db"
import { usersTable } from "../db/schema"
import { insertUser } from "../db/action"
import { eq } from "drizzle-orm"



// const db = [{ 'userName': 'hamidreza', 'password': '$2b$10$hR1Oig0EabHpWvX71SeYuuX3hJipnCMsYgs.7g.ozM5lgAstjLXnu' },]

export async function  signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const { username, password } = validatedFields.data;
    // hash ... 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.username, username))

    if (existingUser.length > 0) {
        return { message: "user already Exists" }
    }

    //first member is 'Owner' and other is 'User'
    const userCount = await db.select().from(usersTable);
    const role = userCount.length === 0 ? 'owner' : 'user';

    const newUser = insertUser({ username, password: hashedPassword, role })
    console.log(newUser);



    await createSession(username,role)

    redirect('/dashboard')
}

export async function login(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username') as string,
        password: formData.get('password') as string
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const { username, password } = validatedFields.data

    const user = await db.select().from(usersTable).where(eq(usersTable.username, username))
    if (user.length === 0) {
        return { error: "User not found" };
    }

    if (!user || !(await bcrypt.compare(password, user[0].password))) {
        console.log('user not found')
        return { error: 'wrong data , try again' }
    }

    await createSession(user[0].id.toString(), user[0].role as 'owner' | 'admin' | 'user')

    redirect('/dashboard')
}
