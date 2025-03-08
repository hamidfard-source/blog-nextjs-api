import { NextResponse } from "next/server"

const GET = () => {
    return NextResponse.json({}, { status: 200 })
}

const POST = async (request: Request) => {
    const { title, content, imageUrl } = await request.json()
    console.log('body: ',title,content,imageUrl);
    
    return NextResponse.json({"message":"success upload"},{status:201})
}