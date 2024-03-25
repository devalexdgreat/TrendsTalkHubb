"use client";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";



export default function LogoutBtn() {

    const router = useRouter();

    const Logout = () => {
        // Clear the access token from local storage
        localStorage.removeItem('accessToken');
    
        // Redirect the user to the login page
        router.push('/login'); // Replace '/login' with the appropriate login page route
    }

    return (
        <button onClick={Logout} className="py-1 px-3 bg-black text-white hover:bg-black/80 duration-500 rounded-md flex items-center gap-1">
            <span>Logout</span>
            <FiLogOut />
        </button>
    );
}