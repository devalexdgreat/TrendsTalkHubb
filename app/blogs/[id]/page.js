// "use client";
import PostCard from "@/app/components/PostCard";
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import PostSideBar from '@/app/components/PostSideBar';
// import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "./layout";

export default function Blog({ params }) {
    const { id } = params;

    function isTokenExpired(token) {
        if (!token) {
            // If token is not provided, consider it as expired
            return true;
        }
    
        try {
            // Decode the token
            const payload = JSON.parse(atob(token.split('.')[1]));
    
            // Get the expiration time (exp) from the payload
            const expirationTime = payload.exp * 1000; // Convert to milliseconds
    
            // Check if the current time is after the expiration time
            return Date.now() >= expirationTime;
        } catch (error) {
            // If decoding fails, consider the token as expired
            return true;
        }
    }

    // useEffect(() => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     if (isTokenExpired(accessToken)) {
    //         console.log('Access token has expired');
    //         router.push('/login');

    //     } else {
    //         console.log('Access token is still valid');
    //     }
    // });

    return (
            <div className="w-full">
                
                <Navbar />
                <div className="w-full mt-20 mb-24">
                    <div className="w-[95%] mx-auto flex flex-col md:flex-row gap-3 md:gap-8">
                        <PostCard postid={id} />
                        <PostSideBar />
                    </div>
                </div>
            </div>
    );
}
