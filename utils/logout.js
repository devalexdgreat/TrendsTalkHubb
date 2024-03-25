'use client';
import { useRouter } from 'next/navigation';

function Logout() {
    // Clear the access token from local storage
    localStorage.removeItem('accessToken');

    // Redirect the user to the login page
    const router = useRouter();
    router.push('/login'); // Replace '/login' with the appropriate login page route
}

export default Logout;
