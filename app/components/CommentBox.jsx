export default function CommentBox() {
    return (
        <div>
            <form className="w-full py-4">
                <div className="flex gap-1 items-center mb-2">
                    {/* <span className="font-bold">@Alexander</span>
                    <span>Leave a Comment</span> */}
                    <span className="font-semibold">Comments</span>
                </div>
                <div>
                    <div className="relative">
                        <textarea
                        className="bg-white outline-none border border-black h-full w-full rounded-md p-2"
                        rows="5"
                        placeholder="Write a Comment"
                        // OnChange={setFormData}
                        name="comment"
                        id="comment"
                        
                        ></textarea>
                        <input type="submit" className="bg-black py-1.5 px-6 rounded-md text-white hover:bg-black/70 duration-500 absolute bottom-3 right-2" value='Send' />
                    </div>
                </div>
            </form>
            <div className="w-full">
                <div className="flex items-center gap-1 text-base md:text-lg font-semibold mb-2">
                    <span><span>7</span> Comments on &ldquo;Blord causes a buzz...&rdquo;</span>
                </div>
                <div className="mt-1 w-full flex flex-col gap-3">
                    <div className="w-full p-2 bg-black/5 rounded-md">
                        <div className="flex flex-col mb-2 justify-center">
                            <span className="font-semibold">@alexander</span>
                            <span className="text-[13px]">19-04-2024</span>
                        </div>
                        <div>
                            <span>Wizkid is a perfect example of a true successful great man. He is alway humble thats why I love him</span>
                        </div>
                    </div>
                    <div className="w-full p-2 bg-black/5 rounded-md">
                        <div className="flex flex-col mb-2 justify-center">
                            <span className="font-semibold">@cynthia</span>
                            <span className="text-[13px]">28-04-2004</span>
                        </div>
                        <div>
                            <span>I dont even know 😕 why l love dis guy so much 001 for life ❤️ 💙</span>
                        </div>
                    </div>
                    <div className="w-full p-2 bg-black/5 rounded-md">
                        <div className="flex flex-col mb-2 justify-center">
                            <span className="font-semibold">@Ruffus</span>
                            <span className="text-[13px]">31-04-2024</span>
                        </div>
                        <div>
                            <span>many people get money for Nigeria like 💯 him.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}