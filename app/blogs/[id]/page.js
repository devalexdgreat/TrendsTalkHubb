// "use client";
import PostCard from "@/app/components/PostCard";
import Navbar from '@/app/components/Navbar';
import PostSideBar from '@/app/components/PostSideBar';
import { getCookies } from "@/actions";
import Footer from "@/app/components/Footer";

const fetchPostById = async (id, accessToken) => {
    try {
        // Fetch post data from the protected endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch post");
        }

        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error(error);
    }
};

const fetchComments = async (id) => {
    try {
        // Fetch post data from the protected endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}/comments`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch comments");
        }

        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error(error);
    }
};

const fetchRelated = async (data) => {
    try {
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/posts?limit=12`;

        // Check if there are tags
        if (data.tags && data.tags.length > 0) {
            // Construct the query parameters for each tag
            const queryParams = data.tags.map((tag, index) => `tags[${index}]=${tag}`).join('&');
            url += `&${queryParams}`;
        }

        // Fetch post data from the protected endpoint
        const response = await fetch(url, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch related post");
        }

        const relatedPosts = await response.json();
        return relatedPosts;
        
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

const getPosts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?limit=${4}`, {
            cache: "no-store",
        });
  
        if (!res.ok) {
            throw new Error("Failed to fetch related posts");
        }
  
        return res.json();
        
    } catch (error) {
        console.log(error);
    }
}

export default async function Blog({ params }) {
    const { id } = params;
    
    const rawToken = await getCookies();
    const accessToken = rawToken?.value;
    const fallbackToken = process.env.NEXT_PUBLIC_FALLBACK_TOKEN;
    const aT = accessToken ? accessToken : fallbackToken;

    const post = await fetchPostById(id, aT);
    const sameTag = await fetchRelated(post);

    function checkRelated() {
        if(sameTag) {
            const related = sameTag.filter(indPost => indPost.id !== id);
            return related;
        }
    }
        
    const related = checkRelated();
    
    const posts = await getPosts();
    const com = await fetchComments(id);
    const comments = com.reverse();

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full mt-20 mb-24">
                <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-3 md:gap-8">
                    <PostCard post={post} token={aT} postid={id} relatedData={related} comments={comments} />
                    <PostSideBar posts={posts} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
