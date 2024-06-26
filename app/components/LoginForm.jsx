'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookies } from "@/actions";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { IoChevronBackOutline } from "react-icons/io5";
import { BiHide, BiShowAlt } from "react-icons/bi";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passIsNotVis, setPassIsNotVis] = useState(true);

    const router = useRouter();

    const toggleShow = () => {
        setPassIsNotVis(prevpassIsNotVis => !prevpassIsNotVis);
    }
    
    const handleSumbit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('All fields are necessary!', {
                position: "top-center"
              })
            return;
        }

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
                const successMsg = data.message;
                toast.success(successMsg, {
                    position: "top-center"
                  })
                await setCookies(accessToken);

                // Store the token in local storage or session storage
                localStorage.setItem('accessToken', accessToken);

                // Redirect to a secured page or any other page
                router.refresh();
                router.push("/");
                
            } else {
                const errorData = await response.json();
                toast.error(errorData.message, {
                    position: "top-center"
                  })
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An unexpected error occurred', {
                position: "top-center"
              })
        }
    }

    return (
        <div className="flex justify-center items-center h-screen w-full bg-white backdrop-blur-sm fixed top-0 left-0">
            <div className="rounded-lg w-full md:w-4/12 px-6 py-6 text-black z-40 bg-white relative">
                <Link href={'/'} className="text-black rounded-md p-2 pe-3 justify-center absolute top-2 left-2 flex items-center gap-1 font-medium hover:text-black/60 duration-500"><IoChevronBackOutline /><span>HOME</span></Link>
                <div className="w-full pb-6 flex flex-col justify-center items-center">
                    <Toaster/>
                    <Link className="" href={'/'} alt="back">
                        <Image src='/favicon.png' width={100} height={100} className="" alt="logo" />
                    </Link>
                    <h1 className="font-semibold text-xl md:text-2xl pb-0.5">Sign in to your account</h1>
                </div>
                <div className="w-full text-[13px]">
                    <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSumbit}>
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-semibold">Email Address</label>
                            <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => setEmail(e.target.value)} className="text-[12px] py-3 rounded-md ps-3 border border-black" />
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
                            <input type="submit" className="font-semibold w-full py-3 px-5 bg-black text-white rounded-lg text-sm hover:bg-black/70 duration-500" value="Log in" />
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