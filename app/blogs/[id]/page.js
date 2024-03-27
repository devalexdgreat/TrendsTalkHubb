// "use client";
import PostCard from "@/app/components/PostCard";
import Navbar from '@/app/components/Navbar';
import PostSideBar from '@/app/components/PostSideBar';

export default function Blog({ params }) {
    const { id } = params;

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full mt-20 mb-24">
                <div className="w-[95%] mx-auto flex flex-col md:flex-row gap-3 md:gap-8">
                    <PostCard postid={id} />
                    <PostSideBar />
                </div>
            </div>
        </div>
    );
}
