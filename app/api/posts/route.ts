import { db } from "@/app/db/db"
import { postTable } from "@/app/db/schema"
import { NextResponse } from "next/server"

export const GET = async (request:Request) => {

  const data = await db.select().from(postTable)
  return NextResponse.json({data},{status:200})
}
