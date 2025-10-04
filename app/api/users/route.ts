import { db } from "@/app/db/db";
import { usersTable } from "@/app/db/schema";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try {
        const result = await db.select().from(usersTable);
        if (!Array.isArray(result)) {
            return NextResponse.json({ message: "Invalid data format" }, { status: 500 });
        }
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error' }, { status: 500 });
    }
};
