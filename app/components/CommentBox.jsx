import { getCookies } from "@/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoClose } from "react-icons/io5";

function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

function capString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function CommentBox({ token, postid, user, comments }) {

    const [content, setContent] = useState('');
    const [dData, setDData] = useState('none');
    const [isLogIn, setIsLogIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAt = async () => {
            let aT = await getCookies();
            return aT;
        }
        const checkLogin = async () => {
            let accessToken = localStorage.getItem('accessToken');
            let aToken = await fetchAt();
            if(accessToken != null || aToken != null) {
                setIsLogIn(true);
                return;
            } else {
                setIsLogIn(false);
            }
        }
        checkLogin();
    }, [])

    const toggleMenu = () => {
        setDData('none');
    }

    const goNoAuth = async () => {
        toggleMenu();
    }

    const router = useRouter();
    
    const postComment = async (id, token) => {
        
        if (!content) {
            toast.error("Can't post an empty comment!", {
                position: "top-center"
              })
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                const data = await response.json();
                const successMsg = data.message;
                toast.success(successMsg, {
                    position: "top-center"
                  })
                router.refresh();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message, {
                    position: "top-center"
                  })
            }
        } catch (error) {
            console.error('Error during Comment:', error);
            toast.error('An unexpected error occurred', {
                position: "top-center"
              })
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isLogIn === false) {
            setDData('flex');
            setContent('');
            return;
        }
        setIsLogIn(true);
        await postComment(postid, token);
        setContent('');
    }

    return (
        <div>
            <div style={{display: `${dData}`}} className="flex justify-center items-center h-screen w-full bg-black/30 backdrop-blur-sm fixed top-0 left-0 z-50">
                <div className="text-center rounded-lg w-11/12 md:w-4/12 shadow-2xl shadow-black px-6 py-6 text-black z-40 bg-white relative">
                    <button className="absolute right-1 top-1 bg-red-500 text-white hover:bg-red-400 duration-500 p-1 rounded-md font-semibold text-lg" onClick={goNoAuth}><IoClose /></button>
                    <div className="w-full py-9">
                        <span className="font-semibold text-2xl md:text-2xl pb-0.5">Create an account for more interactivity.</span>
                    </div>
                    <div>
                        <Link href={'/signup'} className="py-2 px-7 bg-black text-white rounded-md hover:bg-black/80 duration-500">Sign up</Link>
                    </div>
                    <div className="mt-9">
                        <span className="text-gray-900 text-lg">Already have an account? </span><Link href={'/login'} className="text-black font-semibold hover:text-black/40 duration-500">Sign in</Link>
                    </div>

                    <div className="mt-4">
                        <span className="text-gray-900 text-lg">Or </span>
                        <button onClick={goNoAuth} className="text-black font-semibold hover:text-black/40 duration-500">Continue...</button>
                    </div>
                </div>
            </div>
            <Toaster />
            <form className="w-full py-4" onSubmit={handleSubmit}>
                <div className="flex gap-1 items-center mb-2">
                    <span className="font-semibold">Comment</span>
                </div>
                <div>
                    <div className="relative">
                        <textarea
                        className="bg-white outline-none border border-black h-full w-full rounded-md p-2 resize-none"
                        rows="5"
                        placeholder={`${user} leave a comment`}
                        name="comment"
                        id="comment"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        ></textarea>
                        <input type="submit" disabled={isLoading} className="bg-black py-1.5 px-6 rounded-md text-white hover:bg-black/70 duration-500 absolute bottom-3 right-2" value='Send' />
                    </div>
                </div>
            </form>
            {comments.length > 0 ? (
            <div className="w-full">
                <div className="flex items-center gap-1 text-base md:text-lg font-semibold mb-2">
                    <span>
                        <span>
                        {comments.length}</span> Comment (s) on &ldquo;{truncateString(comments[0].post, 30)}&rdquo;</span>
                </div>
                <div className="mt-1 w-full flex flex-col gap-3">
                    {comments.map((c) => (
                    <div key={c.comment} className="w-full p-2 bg-black/5 rounded-md">
                        <div className="flex flex-col mb-2 justify-center">
                            <span className="font-semibold">@{c.user}</span>
                        </div>
                        <div>
                            <span>{c.comment}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            ):(
                <div>
                    <span>No comments yet, be the first to Comment 😊</span>
                </div>
            )}
        </div>
        
    );
}