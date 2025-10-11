import { db } from "@/app/db/db";
import { usersTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await db.select().from(usersTable);
        if (!Array.isArray(result)) {
            return NextResponse.json({ message: "Invalid data format" }, { status: 500 });
        }
        return NextResponse.json(result, { status: 200 })
    } catch {
        return NextResponse.json({ message: 'error' }, { status: 500 });
    }
};

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const result = await db.delete(usersTable).where(eq(usersTable.id, id));

        return NextResponse.json({ message: "User deleted successfully", result }, { status: 200 });
    
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: 'error deleting user' }, { status: 500 });
    }
}
