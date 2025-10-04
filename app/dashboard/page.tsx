import CreatePostForm from "@/components/blog/createPost";

const Page = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-start justify-center h-screen">
            <div className=" pt-6">
                <CreatePostForm />
            </div>
        </div>
    );
}

export default Page;
