'use client';
import Link from "next/link";
import { useState } from "react";
import { IoChevronBackOutline, IoClose } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { BiHide, BiShowAlt } from "react-icons/bi";

export default function SignUpForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passIsNotVis, setPassIsNotVis] = useState(true);

    const toggleShow = () => {
        setPassIsNotVis(prevpassIsNotVis => !prevpassIsNotVis);
    }

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
                <Link href={'/'} className="text-black rounded-md p-2 pe-3 justify-center absolute top-2 left-2 flex items-center gap-1 font-medium hover:text-black/60 duration-500"><IoChevronBackOutline /><span>HOME</span></Link>
                <div className="w-full pb-6 flex flex-col justify-center items-center">
                    <Toaster/>
                    <Link className="" href={'/'} alt="back">
                        <Image src='/favicon.png' width={100} height={100} className="" alt="logo" />
                    </Link>
                    <h1 className="font-semibold text-xl md:text-2xl pb-0.5">Discover Trends, Get Started</h1>
                </div>
                <div className="w-full text-[13px]">
                    <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-semibold">Username</label>
                            <input onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))} type="text" placeholder="john_doe" className="text-[12px] py-3 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="flex flex-col w-full gap-2 mt-5">
                            <label className="font-semibold">Email Address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" className="text-[12px] py-3 rounded-md ps-3 border border-black" />
                        </div>

                        <div className="mt-5 mb-5 flex flex-col w-full gap-2">
                            <label className="font-semibold">Password</label>
                            <div className="relative">
                                <input type={passIsNotVis ? 'password' : 'text'} placeholder="abc1234%" onChange={(e) => setPassword(e.target.value)} className="text-[12px] py-3 rounded-md ps-3 border border-black block w-full" />
                                <span onClick={toggleShow} className="rounded-r-md bg-black text-white px-3 absolute inset-y-0 right-0 flex items-center">
                                    {passIsNotVis ? (
                                        <BiHide className="text-lg" />
                                    ):(
                                        <BiShowAlt className="text-lg" />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="mb-4 w-full">
                            <input type="submit" className="w-full text-sm font-semibold py-3 px-5 bg-black text-white rounded-lg hover:bg-black/70 duration-500" value="Sign up" />
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