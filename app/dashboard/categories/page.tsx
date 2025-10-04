'use server'
import CategoriesTable from "@/components/blog/categorieTable";
import CategorieDialog from "@/components/ui/dialog";
import { revalidateTag } from "next/cache";

const Page = async () => {
    const getData = await fetch('http://localhost:3000/api/categories',
        { method: "GET", next: { tags: ["categories"] } });
    const result = await getData.json()

    return (
        <div className="dark:bg-[#18203f] p-4 rounded-lg m-3 min-h-screen motion-preset-slide-up-sm motion-delay-300">
            <section className="max-w-6xl md:p-7">
                <h2 className="text-xl capitalize text-comet-200 font-medium font-roboto mb-2 motion-preset-slide-up-right-sm">categories</h2>
                <h6 className="text-sm text-comet-400 font-normal font-roboto  ">Manage your blog categories</h6>
                <div className=" m-w-4xl flex md:flex-row-reverse gap-2 mx-3">
                    <CategorieDialog />
                </div>
                <div className="min-w-2xl max-w-4xl ml-auto mt-5">
                    <CategoriesTable data={result} />
                </div>
            </section>
        </div>
    );
}

export default Page;


export async function revalidateCategories() {
    revalidateTag("categories");
}