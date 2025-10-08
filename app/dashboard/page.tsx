import CreatePostForm from "@/components/blog/createPost";
import { verifySession } from "../api/dal";
import { count, eq } from "drizzle-orm";
import { db } from "../db/db";
import { categoryTable, postTable, usersTable } from "../db/schema";

const Page = async () => {
    const session = await verifySession();

    const [myPostsCount] = await db
        .select({ count: count() })
        .from(postTable)
        .where(eq(postTable.authorId, session.userId))

    let totalUsers = 0;
    let totalCategories = 0

    if (session.role === 'owner') {
        const [userCount] = await db.select({ count: count() }).from(usersTable)
        totalUsers = userCount.count
    }

    if (session.role === 'admin' || session.role === 'owner') {
        const [categoriesCount] = await db.select({ count: count() }).from(categoryTable)
        totalCategories = categoriesCount.count
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-start justify-center h-screen sm:pt-6 lg:p-8">
            <div className="w-2/3 lg:ml-auto">
                <CreatePostForm />
            </div>
            <div className="grid grid-cols-1 mid:grid-cols-3 gap-1">

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium mb-2">پست‌های من</h3>
                    <p className="text-sm font-medium text-blue-600">{myPostsCount.count}</p>
                </div>

                {(session.role === 'admin' || session.role === 'owner') && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-sm font-medium mb-2">دسته‌بندی‌ها</h3>
                        <p className="text-sm font-medium text-green-600">{totalCategories}</p>
                    </div>
                )}

                {session.role === 'owner' && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-sm font-medium mb-2">کل کاربران</h3>
                        <p className="text-sm font-medium text-purple-600">{totalUsers}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;
