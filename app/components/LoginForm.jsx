'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookies } from "@/actions";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    
    const handleSumbit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are necessary!");
            return;
        }
        setError("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const data = await response.json();
                const accessToken = data.accessToken;

                await setCookies(accessToken);

                // Store the token in local storage or session storage
                localStorage.setItem('accessToken', accessToken);

                // Redirect to a secured page or any other page
                
                router.refresh();
                router.push("/");
                
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An unexpected error occurred');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen w-full bg-white backdrop-blur-sm fixed top-0 left-0">
            <div className="rounded-lg w-[95%] md:w-4/12 shadow-2xl shadow-black px-6 py-6 text-black z-40 bg-white relative">
                <div className="w-full pb-6">
                    <h1 className="font-medium text-xl md:text-2xl pb-0.5">Trends Talkhubb - Login</h1>
                </div>
                <div className="w-full text-[12px]">
                    {error && (
                        <div className="mb-4">
                            <span className="bg-red-500 text-white px-2 py-0.5 rounded-md">{error}</span>
                        </div>
                    )}
                    <form className="w-full" onSubmit={handleSumbit}>
                        <div className="flex flex-col w-full gap-2">
                            <label>Email Address</label>
                            <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => setEmail(e.target.value)} className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="mt-5 mb-5 flex flex-col w-full gap-2">
                            <label>Password</label>
                            <input type="password" placeholder="abc1234%" onChange={(e) => setPassword(e.target.value)} className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="mb-4">
                            <input type="submit" className="py-2 px-5 bg-black text-white rounded-lg" value="Log in" />
                        </div>
                        <div className="">
                            <span className="text-gray-500">Dont have an account? </span><Link href={'/signup'} className="text-black font-medium">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}