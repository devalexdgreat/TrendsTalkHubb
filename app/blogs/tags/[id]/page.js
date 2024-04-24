import Navbar from "@/app/components/Navbar";
import PostSideBar from "@/app/components/PostSideBar";
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

const getPosts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?limit=${4}`, {
            cache: "no-store",
        });
  
        if (!res.ok) {
            throw new Error("Failed to fetch Projects");
        }
  
        return res.json();
        
    } catch (error) {
        console.log(error);
    }
}

export default async function Tags({ params }) {

    const { id } = params;
    const posts = await getPostsByTag(id);
    const allPost = await getPosts();

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full mt-20 mb-24">
                <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-3 md:gap-8">
                    <TagPostsCard data={posts} tag={id}/>
                    <PostSideBar posts={allPost} />
                </div>
            </div>
        </div>
    );
}