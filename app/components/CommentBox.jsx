import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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

    // const [comments, setComments] = useState(null);
    console.log(comments);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const router = useRouter();
    
    const postComment = async (id, token) => {
        
        if (!content) {
            toast.error("Can't post an empty comment!", {
                position: "top-center"
              })
            return;
        }

        try {
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
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await postComment(postid, token);
        setContent('');
    }

    return (
        <div>
            <Toaster />
            <form className="w-full py-4" onSubmit={handleSubmit}>
                <div className="flex gap-1 items-center mb-2">
                    <span className="font-semibold">Comment (s)</span>
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
                        <input type="submit" className="bg-black py-1.5 px-6 rounded-md text-white hover:bg-black/70 duration-500 absolute bottom-3 right-2" value='Send' />
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
                    <div key={c} className="w-full p-2 bg-black/5 rounded-md">
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