'use client';
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { getCookies } from "@/actions";

export default function CreateCategoryForm() {
    const [title, setTitle] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title) {
            toast.error("All fields are necessary.", {
                position: "top-center"
              })
            return;
        }

        const at = await getCookies();
        const accessToken = at.value;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title }),
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
            console.error('Error creating new category:', error);
            toast.error('An unexpected error occurred', {
                position: "top-center"
              })
        }
    }

    return (
        <form className="w-full md:w-5/12 flex flex-col gap-3" onSubmit={handleSubmit}>
            <Toaster/>
            <div className="flex flex-col w-full gap-2">
                <label className="font-medium">Category Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Blord causes a buzz..." className="text-sm py-2 rounded-md ps-3 border border-black" />
            </div>
            <div className="flex flex-col w-full gap-2">
                <input type="submit" className="bg-black text-white py-1 px-5 rounded-md hover:bg-black/80 duration-500" value='Create' />
            </div>
        </form>
    );
}