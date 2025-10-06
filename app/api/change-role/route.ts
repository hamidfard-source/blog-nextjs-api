
import { eq } from 'drizzle-orm';
import { usersTable, usersType } from '../../db/schema';
import { db } from '../../db/db';
import { NextResponse } from 'next/server';
import { requireRole } from '../dal';

interface RequestBody {
  id: usersType['id'];
  role: usersType['role'];
}
export async function PUT(request: Request) {

  try {
    await requireRole(['owner']);

    const body: RequestBody = await request.json()

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