import { getCookies } from "@/actions";
import AdminNav from "@/app/components/AdminNav";
import CreateCategoryForm from "@/app/components/CreateCategoryForm";
import Footer from "@/app/components/Footer";
import { redirect } from "next/navigation";

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

export default async function CreateCategory() {

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

    return (
        <div className="w-full h-[75vh]">
            <AdminNav />
            <div className="w-11/12 mx-auto mt-24 text-black">
                <div className="mb-5">
                    <h1 className="font-semibold text-lg md:text-xl">New category</h1>
                </div>
                <CreateCategoryForm />
            </div>
            <Footer />
        </div>
    );
}