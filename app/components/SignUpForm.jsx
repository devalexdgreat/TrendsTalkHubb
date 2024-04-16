'use client';
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function SignUpForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            toast.error('All fields are necessary.', {
                position: "top-center"
              })
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({username, email, password}),
            });

            if(res.ok) {
                const data = await res.json();
                const successMsg = data.message;
                toast.success(successMsg, {
                    position: "top-center"
                  })
                const form = e.target;
                form.reset();
                setError("");
                router.push("/login");
            } else {
                const errorResponse = await res.json();
                const errorMessage = errorResponse.message || "User Registration failed";
                console.error("User Registration failed:", errorMessage);
                toast.error(errorMessage, {
                    position: "top-center"
                  })
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen w-full bg-white backdrop-blur-sm fixed top-0 left-0">
            <div className="rounded-lg w-11/12 md:w-4/12 px-6 py-6 text-black z-40 bg-white relative">
                <div className="w-full pb-6 flex flex-col justify-center items-center">
                    <Toaster/>
                    <Link className="" href={'/'} alt="back">
                        <Image src='/favicon.png' width={100} height={100} className="" alt="logo" />
                    </Link>
                    <h1 className="font-semibold text-xl md:text-2xl pb-0.5">Discover Trends, Get Started</h1>
                </div>
                <div className="w-full text-[12px]">
                    <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-semibold">Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="alex_dgreat" className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="flex flex-col w-full gap-2 mt-5">
                            <label className="font-semibold">Email Address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="mt-5 mb-5 flex flex-col w-full gap-2">
                            <label className="font-semibold">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="abc1234%" className="text-[12px] py-2 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="mb-4 w-full">
                            <input type="submit" className="w-full text-sm font-semibold py-2 px-5 bg-black text-white rounded-lg hover:bg-black/70 duration-500" value="Sign up" />
                        </div>
                        <div className="text-base">
                            <span className="text-gray-500">Already have an account? </span><Link href={'/login'} className="text-black font-semibold hover:text-black/40 duration-500">Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}