import CategoryCard from "@/app/components/CategoryCard";
import Navbar from "@/app/components/Navbar";
import PostSideBar from "@/app/components/PostSideBar";

const getPostsByCategory = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${id}`, {
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

export default async function Categories({ params }) {

    const { id } = params;
    const {posts} = await getPostsByCategory(id);
    const {title} = await getPostsByCategory(id);

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full mt-20 mb-24">
                <div className="w-[95%] mx-auto flex flex-col md:flex-row gap-3 md:gap-8">
                    <CategoryCard data={posts} tag={id} title={title}/>
                    <PostSideBar />
                </div>
            </div>
        </div>
    );
}