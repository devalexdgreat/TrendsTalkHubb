import Image from "next/image";
import Link from "next/link";
import imgOne from '@/public/1.jpg'
import imgTwo from '@/public/2.jpg'
import imgThr from '@/public/3.jpg'
import imgFor from '@/public/4.jpg'
import { useEffect } from "react";



export default function SearchComponent({ foundQuery, clickStatus }) {
    var found;
    var isEmpty;
    if(foundQuery.length > 0) {
        found = foundQuery;
        isEmpty = true;
    } 
    else if (clickStatus == false) {
        isEmpty = true;
        found = [];
    }
    else {
        found = [];
        isEmpty = false;
    }
    return (
            <>
                {isEmpty ? (
                    <>
                        <div className="w-full md:w-6/12 mt-3">
                            <h1>Results for Search</h1>
                        </div>
                        <div className="w-full md:w-6/12 flex flex-col only:md:flex-row mt-3 gap-2">
                            {found.map((f) => (
                                <div key={f.id} className="z-10">
                                    <Link href={`/blogs/${f.id}`} className="z-20 group bg-black/30 backdrop-blur-sm rounded-md p-2 flex h-24 gap-2">
                                        <div className="w-3/12 h-full">
                                            <Image src={imgOne} className="rounded-md object-cover h-full" alt="" />
                                        </div>
                                        <div className="w-9/12 h-full flex items-center">
                                            <h1 className="text-[13px] md:text-base group-hover:text-gray-400 duration-500 font-bold">{f.title}</h1>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="w-full md:w-6/12 mt-3 bg-red-500 text-white ps-2 rounded-md">
                        <h1>Not Found</h1>
                    </div>
                )} 
            </>
    );
}