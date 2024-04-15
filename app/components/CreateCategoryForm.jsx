export default function CreateCategoryForm() {
    return (
        <form className="w-full md:w-5/12 flex flex-col gap-3">
            <div className="flex flex-col w-full gap-2">
                <label className="font-medium">Title</label>
                <input type="text" placeholder="Blord causes a buzz..." className="text-sm py-2 rounded-md ps-3 border border-black" />
            </div>
            <div className="flex flex-col w-full gap-2">
                <label className="font-medium">Tags</label>
                <input type="text" placeholder="trending, viral, gist, media, tiktok" className="text-sm py-2 rounded-md ps-3 border border-black" />
            </div>
            <div className="flex flex-col w-full gap-2">
                <input type="submit" className="bg-black text-white py-1 px-5 rounded-md hover:bg-black/80 duration-500" value='Post' />
            </div>
        </form>
    );
}