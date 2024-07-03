import { getCookies } from "@/actions";
import AdminNav from "@/app/components/AdminNav";
import EditPostForm from "@/app/components/EditPostForm";
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
  
function findNameById(array, title) {
    return array.filter((obj) => obj.title !== title);
}

function findObjId(array, title) {
    return array.find((obj) => obj.title === title);
}

export default async function EditPost({ params }) {

    const { id } = params;
    console.log("I am the id: ", id);

    const token = await getCookies();
    checkToken(token);
    const aT = token.value;
    
    if (isTokenExpired(aT)) {
        console.log('Access token has expired');
        redirect('/login');
        return;
    }

    const user = await fetchUser(aT);
    if(user.role !== 'admin') {
        redirect('/');
    }

    const post = await fetchPostById(id, aT);

    const categories = await getCategories();
    const el = findNameById(categories, post.category);
    const elm = findObjId(categories, post.category);
    console.log(elm);

    return (
        <div className="w-full">
            <AdminNav />
            <div className="w-11/12 mx-auto mt-24 mb-24 text-black">
                <div className="mb-5">
                    <h1 className="font-semibold text-lg md:text-xl">Edit Post</h1>
                </div>
                <EditPostForm data={el} pData={post} cData={elm} id={id} />
            </div>
            <Footer />
        </div>
    );
}