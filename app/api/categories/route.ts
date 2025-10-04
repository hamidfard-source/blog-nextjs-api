import { db } from "@/app/db/db"
import { categoryTable, type categoryType } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

// GET all categories
export async function GET() {
  try {
    const categories = await db.select().from(categoryTable);
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST create new category
export async function POST(request: Request) {
  try {
    const body: { name: string } = await request.json();
    const existingCategory = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.name, body.name))
      .execute();

    if (existingCategory.length > 0) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 409 } // 409 Conflict is appropriate for duplicate resource
      );
    }

    const newCategory = await db
      .insert(categoryTable)
      .values(body)
      .returning();

    return NextResponse.json(
      { data: newCategory[0], success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await db.delete(categoryTable).where(eq(categoryTable.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}