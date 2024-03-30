'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookies } from "@/actions";
import Image from "next/image";


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
            <div className="rounded-lg w-11/12 md:w-4/12 px-6 py-6 text-black z-40 bg-white relative">
                <div className="w-full pb-6 flex flex-col justify-center items-center">
                    <Link className="" href={'/'} alt="back">
                        <Image src='/favicon.png' width={100} height={100} className="" alt="logo" />
                    </Link>
                    <h1 className="font-semibold text-xl md:text-2xl pb-0.5">Sign in to your account</h1>
                </div>
                <div className="w-full text-[12px]">
                    {error && (
                        <div className="mb-4 w-full flex justify-center items-center">
                            <span className="bg-red-500 text-white px-2 py-0.5 rounded-md">{error}</span>
                        </div>
                    )}
                    <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSumbit}>
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-semibold">Email Address</label>
                            <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => setEmail(e.target.value)} className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="mt-5 mb-5 flex flex-col w-full gap-2">
                            <label className="font-semibold">Password</label>
                            <input type="password" placeholder="abc1234%" onChange={(e) => setPassword(e.target.value)} className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="mb-4 w-full">
                            <input type="submit" className="font-semibold w-full py-2 px-5 bg-black text-white rounded-lg text-sm hover:bg-black/70 duration-500" value="Log in" />
                        </div>
                        <div className="text-base">
                            <span className="text-gray-500">Dont have an account? </span><Link href={'/signup'} className="text-black font-semibold hover:text-black/40 duration-500">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}