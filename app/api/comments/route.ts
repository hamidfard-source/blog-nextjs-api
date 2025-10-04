import { db } from "@/app/db/db"
import { comments, type commentsType } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const userId = searchParams.get('userId');

    if (!postId && !userId) {
      return NextResponse.json(
        { error: 'postId or userId is required' },
        { status: 400 }
      );
    }

    let query = db.select().from(comments);

    if (postId) {
      query = query.where(eq(comments.postId, Number(postId))) as typeof query;
    }

    if (userId) {
      query = query.where(eq(comments.userId, Number(userId))) as typeof query;
    }

    const commentsList = await query;
    return NextResponse.json(commentsList);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST create new comment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newComment = await db.insert(comments).values(body).returning();
    return NextResponse.json(newComment[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

// DELETE comment
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await db.delete(comments).where(eq(comments.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}