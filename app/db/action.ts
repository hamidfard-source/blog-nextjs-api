import { eq } from "drizzle-orm";
import { db } from "./db";
import { usersTable } from "./schema";

type DataType = {
    username: string | '',
    password: string | '',
    role: 'admin' |'user'| 'owner',
}


export async function insertUser(data: DataType) {
    const user: typeof usersTable.$inferInsert={
        username: data.username,
        password : data.password,
        role : data.role  ,
    }

    await db.insert(usersTable).values(user)
}

export async function setRole (userRole: "owner"|"admin"|"user" , userId : number){
    try {
        const updateRole = await db.update(usersTable).set({role: userRole}).where(eq(usersTable.id , userId ))
        return updateRole;
    } catch (error) {
        console.warn("Error in updating Role: ", error);
        throw error;
    }
}  

export const allUser = await db.select().from(usersTable);