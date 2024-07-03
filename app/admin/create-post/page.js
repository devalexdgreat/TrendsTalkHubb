import { getCookies } from "@/actions";
import AdminNav from "@/app/components/AdminNav";
import CreatePostForm from "@/app/components/CreatePostForm";
import Footer from "@/app/components/Footer";
import { redirect } from "next/navigation";

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

const fetchUser = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/get_current_user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: "no-store"
        });

        if (response.ok) {
            const userData = await response.json();
            return userData.user;
        } else {
            console.error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

const checkToken = (token) => {
    if(token) {
        console.log('Token present.')
        return;
    } else {
        redirect('/login');
    }
};

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

export default async function CreatePost() {

    const tokenRaw = await getCookies();
    checkToken(tokenRaw);
    const token = tokenRaw.value;

    if (isTokenExpired(token)) {
        console.log('Access token has expired');
        redirect('/login');
        return;
    } else {
        console.log('Access token is still valid');
    }

    const user = await fetchUser(token);
    if(user.role !== 'admin') {
        redirect('/');
    }

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
            <Footer />
        </div>
    );
}