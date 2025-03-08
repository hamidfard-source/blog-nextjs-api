import upload from "@/lib/multer";
import { NextResponse } from "next/server"


export const config = {
    api: {
        bodyParser: false,
    },
}

export async function POST(req: Request) {
    console.log(req);
    
    try {
        await new Promise<void>((resolve, reject) => {
            upload.single('cover')(req as any, {} as any, (err: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            })
        });
        const file = (req as any).file;
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const fileUrl = `/uploads/${file.filename}`
        NextResponse.json({ url: fileUrl }, { status: 201 })
    } catch (error) {
        console.log("upload IMG Error ", error);
        NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }

}