import AdminNav from "@/app/components/AdminNav";
import CreatePostForm from "@/app/components/CreatePostForm";

const getCategories = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
            cache: "no-store",
        });
        
        if (!res.ok) {
            throw new Error("Failed to fetch Posts under category");
        }

        const data = await res.json();
        return data;



    } catch (error) {
        console.log(error);
    }
}

export default async function CreatePost() {

    const categories = await getCategories();

    return (
        <div className="w-full">
            <AdminNav />
            <div className="w-11/12 mx-auto mt-24 mb-24 text-black">
                <div className="mb-5">
                    <h1 className="font-semibold text-lg md:text-xl">Create Post</h1>
                </div>
                <CreatePostForm data={categories} />
            </div>
        </div>
    );
}