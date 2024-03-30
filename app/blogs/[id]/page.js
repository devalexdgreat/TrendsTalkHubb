// "use client";
import PostCard from "@/app/components/PostCard";
import Navbar from '@/app/components/Navbar';
import PostSideBar from '@/app/components/PostSideBar';
import { getCookies } from "@/actions";
import { redirect } from "next/navigation";

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

const fetchRelated = async (data) => {
    try {
        // Fetch post data from the protected endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?tags[0]=${data.tags[0]}&tags[1]=${data.tags[1]}&limit=2`, {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
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

function isTokenExpired(token) {
    if (!token) {
        // If token is not provided, consider it as expired
        return true;
    }

    try {
        // Decode the token
        const payload = JSON.parse(atob(token.split('.')[1]));

        // Get the expiration time (exp) from the payload
        const expirationTime = payload.exp * 1000; // Convert to milliseconds

        // Check if the current time is after the expiration time
        return Date.now() >= expirationTime;
    } catch (error) {
        // If decoding fails, consider the token as expired
        return true;
    }
}

const checkToken = (token) => {
    if(token) {
        console.log('Token present.')
        return;
    } else {
        redirect('/login')
    }
};

export default async function Blog({ params }) {
    const { id } = params;
    const token = await getCookies();
    checkToken(token);
    const aT = token.value;
    
    if (isTokenExpired(aT)) {
        console.log('Access token has expired');
        router.push('/login');
        return;
    } else {
        console.log('Access token is still valid');
    }

    const post = await fetchPostById(id, aT);
    const sameTag = await fetchRelated(post);
    const related = sameTag.filter(indPost => indPost.id !== id);
    const posts = await getPosts();

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full mt-20 mb-24">
                <div className="w-[95%] mx-auto flex flex-col md:flex-row gap-3 md:gap-8">
                    <PostCard post={post} token={aT} postid={id} relatedData={related} />
                    <PostSideBar posts={posts} />
                </div>
            </div>
        </div>
    );
}
