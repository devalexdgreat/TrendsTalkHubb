'use client';
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useRouter } from 'next/navigation';

export default function SignUpForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError("All fields are necessary.");
            return;
        }
        setError("");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({username, email, password}),
            });

            if(res.ok) {
                const form = e.target;
                form.reset();
                setError("");
                router.push("/login");
            } else {
                const errorResponse = await res.json();
                const errorMessage = errorResponse.message || "User Registration failed";
                console.error("User Registration failed:", errorMessage);
                setError(errorMessage);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen w-full bg-white backdrop-blur-sm fixed top-0 left-0">
            <div className="rounded-lg w-[95%] md:w-4/12 shadow-2xl shadow-black px-6 py-6 text-black z-40 bg-white relative">
                <div className="w-full pb-6">
                    <h1 className="font-bold text-xl md:text-2xl pb-0.5">Trends Talkhubb - Sign up</h1>
                </div>
                <div className="w-full text-[12px]">
                    {error && (
                        <div className="mb-4">
                            <span className="bg-red-500 text-white px-2 py-0.5 rounded-md">{error}</span>
                        </div>
                    )}
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full gap-2">
                            <label>Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="alex_dgreat" className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="flex flex-col w-full gap-2 mt-5">
                            <label>Email Address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="mt-5 mb-5 flex flex-col w-full gap-2">
                            <label>Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="abc1234%" className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="mb-4">
                            <input type="submit" className="py-2 px-5 bg-black text-white rounded-lg" value="Sign up" />
                        </div>
                        <div className="">
                            <span className="text-gray-500">Already have an account? </span><Link href={'/login'} className="text-black font-bold">Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}