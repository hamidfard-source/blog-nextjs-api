import CreatePostForm from "@/components/createPost";

const Page = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-start justify-center h-screen">
            <div className="flex flex-col justify-between w-[60%] h-[90%] p-3 ">
                <CreatePostForm />
            </div>
        </div>
    );
}

export default Page;
