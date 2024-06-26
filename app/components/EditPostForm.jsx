"use client";
import Image from "next/image";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { getCookies } from "@/actions";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function convertStringToArray(inputString) {
    // Split the input string based on commas
    const wordsArray = inputString.split(',');
    
    // Trim whitespace from each word and remove empty strings
    const trimmedArray = wordsArray.map(word => word.trim()).filter(Boolean);
    
    return trimmedArray;
}



export default function EditPostForm({ data, pData, cData, id }) {
    // console.log(pData.tags);
    // const string = pData.tags.join(', ');
    const [pselectedImage, setPselectedImage] = useState(pData.images);
    const [selectedImage, setSelectedImage] = useState();
    const [title, setTitle] = useState(pData.title);
    const [tags, setTags] = useState(pData.tags);
    const [content, setContent] = useState(pData.content);
    const [category, setCategory] = useState(cData.id);
    const [images, setImages] = useState();

    const router = useRouter();

    const onSelectFile = (e) => {
        const selFiles = e.target.files;
        const selFilesArr = Array.from(selFiles);
        setImages(selFilesArr);
        const imagesArray = selFilesArr.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImage(imagesArray)
    }
    
    const getTags = (e) => {
        e.preventDefault();
        var words = e.target.value;
        setTags(words.split(/,\s|,/));
        console.log(tags);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!title || !content || !tags || !category || !selectedImage) {
        //     toast.error("All fields are necessary.", {
        //         position: "top-center"
        //       })
        //     return;
        // }
        const formData = new FormData();
        formData.append('title',title)
        formData.append('content',content)
        tags.forEach((tag) => {
            formData.append('tags', tag);
        })
        formData.append('category',category)
        if(images) {
            images.forEach((image) => {
                formData.append('images', image);
            });
        }
        
        const at = await getCookies();
        const accessToken = at.value;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                const successMsg = data.message;
                toast.success(successMsg, {
                    position: "top-center"
                  })
                router.refresh();
                router.push("/admin");
                
            } else {
                const errorData = await res.json();
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
        <form className="w-full md:w-5/12 flex flex-col gap-3" onSubmit={handleSubmit}>
            <Toaster/>
            <div className="flex flex-col w-full gap-2">
                <label className="font-medium">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blord causes a buzz..." className="text-sm py-2 rounded-md ps-3 border border-black pe-2" />
            </div>
            <div className="flex flex-col w-full gap-2">
                <label>Description</label>
                <textarea
                    className="bg-white border border-black h-full w-full rounded-md p-2 resize-none"
                    rows="5"
                    placeholder={`Content description`}
                    name="description"
                    id="description"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    >
                </textarea>
            </div>
            <div className="flex flex-col w-full gap-2">
                <label className="font-medium">Tags</label>
                <input type="text" value={tags} onChange={getTags} placeholder="trending, viral, gist, media, tiktok" className="text-sm py-2 rounded-md ps-3 border border-black pe-2" />
            </div>
            <div className="flex items-center justify-between w-full gap-2">
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium">Category</label>
                    <div className="flex gap-3 items-center">
                        <select onChange={(e) => setCategory(e.target.value)} className="py-2 border border-black rounded-md px-1">
                            <option value={cData.id}>{pData.category}</option>
                            {data.map(o => (
                            <option key={o.id} value={o.id}>{o.title}</option>
                            ))}
                        </select>
                        <div>Or</div>
                        <Link href={'/admin/create-category'} className="bg-black text-white py-1.5 px-2 rounded-md flex gap-1 items-center hover:bg-black/80 duration-500">
                            <FiPlus /><span>Add New</span>
                        </Link>
                        
                    </div>
                </div>
                
            </div>
            <div className="flex flex-col w-full gap-2">
                <label>Post Image (s)</label>
                <input
                accept="image/*"
                type="file"
                placeholder="sele"
                multiple
                onChange={onSelectFile}
                />
                
                {selectedImage ? (
                <>
                    <h1>Preview</h1>
                    <div className="grid grid-cols-4 md:grid-cols-4 gap-1">
                        {selectedImage.map((image, index) => {
                            return (
                                <div key={image} className="relative">
                                    <Image
                                    src={image}
                                    className=""
                                    height={1000}
                                    width={1000}
                                    alt="Thumb"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </>
                ):(
                    <>
                    <h1>Preview</h1>
                    <div className="grid grid-cols-4 md:grid-cols-4 gap-1">
                        {pselectedImage.map((image, index) => {
                            return (
                                <div key={index} className="relative">
                                    <Image
                                    src={image.url}
                                    className=""
                                    height={1000}
                                    width={1000}
                                    alt="Thumb"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </>
                )}
            </div>
            <div className="flex flex-col w-full gap-2">
                <input type="submit" className="bg-black text-white py-1 px-5 rounded-md hover:bg-black/80 duration-500" value='Post' />
            </div>
        </form>
    );
}