"use client";
import { useState } from "react";
import SearchComponent from "./SearchComponent";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function SearchBarBody({ disData }) {

    const [dispData, setDispData] = useState("block");
    const toggleMenu = () => {
        setDispData('hidden');
    }

    return (
        <div style={{display: `${disData}`}} className="z-20 w-full text-white fixed top-0 h-screen bg-black/50 backdrop-blur-sm">
            <div className="w-[95%] mx-auto flex flex-col items-end md:justify-end py-3">
                <div className="w-full md:w-6/12 flex items-center gap-1">
                    <input type="text" className="w-full py-0.5 ps-2 rounded-sm text-black" placeholder="Search here"/>
                    <button className="bg-black hover:bg-black/70 backdrop-blur-sm rounded-sm duration-500 p-2">
                        <FiSearch />
                    </button>
                    <button onClick={toggleMenu} className="bg-red-500 hover:bg-red-500/90 backdrop-blur-sm rounded-sm duration-500 p-2"><IoClose /></button>
                </div>
                <SearchComponent />
            </div>
        </div>
    );
}