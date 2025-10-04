
import { eq } from 'drizzle-orm';
import { rolesEnum, usersTable, usersType } from '../../db/schema';
import { db } from '../../db/db';
import { NextResponse } from 'next/server';

interface RequestBody {
  id: usersType['id'];
  role: usersType['role'];
}
export async function PUT(request: Request) {

  const body: RequestBody = await request.json()
  console.log(body);

  // return NextResponse.json({body})
  try {
    const result = await db.update(usersTable)
      .set({ role: body.role })
      .where(eq(usersTable.id, body.id))
      .execute();

    console.log("Database update result:", result);
    return NextResponse.json({ message: 'Role updated successfully', result }, { status: 200 });
  } catch (error) {
    console.error("Database update failed:", error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}