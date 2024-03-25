import Navbar from "@/app/components/Navbar";
import SideBar from "@/app/components/SideBar";
import TagPostsCard from "@/app/components/TagPostsCard";

const getPostsByTag = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?tags=${id}`, {
            cache: "no-store",
        });
        
        if (!res.ok) {
            throw new Error("Failed to fetch Posts");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export default async function Tags({ params }) {

    const { id } = params;
    const posts = await getPostsByTag(id);
    console.log('hey', posts);

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full mt-20 mb-24">
                <div className="w-[95%] mx-auto flex flex-col md:flex-row gap-3 md:gap-8">
                    <TagPostsCard data={posts} tag={id}/>
                    <SideBar />
                </div>
            </div>
        </div>
    );
}