import { db } from "@/app/db/db"
import { postTable, type postsType } from "@/app/db/schema"
import { and,eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId');
        const authorId = searchParams.get('authorId');

        let query = db.select().from(postTable);

        if (categoryId) {
            query = query.where(eq(postTable.categoryId, Number(categoryId))) as typeof query;
        }

        if (authorId) {
            query = query.where(eq(postTable.authorId, Number(authorId))) as typeof query;
        }

        const posts = await query;
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

interface RequestBody {
    title: postsType['title']
    content: postsType['content']
    cover: postsType['imageUrl']
}

export const POST = async (request: Request) => {
    const { title, content, cover }: RequestBody = await request.json()
    const post: postsType = { title, content, imageUrl: cover, author: 1 };
    try {
        const insertPost = await db.insert(postTable).values(post).returning();

        return NextResponse.json({
            data: { title, content, cover },
            message: "Post created successfully",
        }, { status: 201 })
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

// PUT update post
export async function PUT(request: Request) {
    try {
        const { id, ...data } = await request.json();
        const updatedPost = await db
            .update(postTable)
            .set(data)
            .where(eq(postTable.id, id))
            .returning();
        return NextResponse.json(updatedPost[0]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update post' },
            { status: 500 }
        );
    }
}

// DELETE post
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await db.delete(postTable).where(eq(postTable.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete post' },
            { status: 500 }
        );
    }
}