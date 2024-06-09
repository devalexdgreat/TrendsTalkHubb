
'use client'
import Image from "next/image";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from "next/link";

function timeSinceCreation(createdDate) {
    // Get the current date
    var currentDate = new Date();

    // Convert the createdDate string to a Date object
    var createdDateObj = new Date(createdDate);

    // Calculate the difference in milliseconds
    var differenceInMs = currentDate - createdDateObj;

    // Convert milliseconds to seconds
    var differenceInSeconds = differenceInMs / 1000;

    // Determine the appropriate time unit
    if (differenceInSeconds < 60) {
        return Math.floor(differenceInSeconds) + " second" + (Math.floor(differenceInSeconds) === 1 ? "" : "s") + " ago";
    } else if (differenceInSeconds < 3600) {
        var minutes = Math.floor(differenceInSeconds / 60);
        return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    } else if (differenceInSeconds < 86400) {
        var hours = Math.floor(differenceInSeconds / 3600);
        return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    } else if (differenceInSeconds < 604800) {
        var days = Math.floor(differenceInSeconds / 86400);
        return days + " day" + (days === 1 ? "" : "s") + " ago";
    } else if (differenceInSeconds < 2419200) { // Assuming 7 days as a week
        var weeks = Math.floor(differenceInSeconds / 604800);
        return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
    } else {
        return "more than a month ago";
    }
}

function formatNumber(number) {
    if (number >= 1000000000000) {
        return (number / 1000000000000).toFixed(1) + ' T';
    } else if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + ' B';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + ' M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + ' K';
    } else {
        return number.toString();
    }
}

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}

export default function SlideShow({ feed }) {
    return (
        <Splide 
        options={ {
            rewind: true,
            autoplay: true,
            gap   : '1rem',
            arrows: false,
        } }
        hasTrack={ false } aria-label="...">
            <div className="custom-wrapper">
                <div className="splide__progress">
                    <div className="splide__progress__bar" />
                </div>
                <SplideTrack className="h-60 md:h-[26rem] b-rad">
                    {feed.map((f) => (
                        <SplideSlide key={f.id} className="h-full relative">
                            <Link className="h-full absolute w-full bg-transparent" href={`/blogs/${f.id}`}></Link>
                            <Image src={f.images[0].url} width={1000} height={1000} alt="Image 1" className="object-cover object-top w-full h-full b-rad" />
                            <div className="b-rad w-full absolute bg-black/5 backdrop-blur-sm text-white bottom-0 pb-8 md:pb-8 px-2 flex justify-center">
                                <span className="md:hidden w-full md:w-8/12 mx-auto text-center text-base md:text-xl font-semibold">{truncateString(f.title, 70)}</span>
                                <span className="hidden md:block w-full md:w-8/12 mx-auto text-center text-base md:text-xl font-semibold">{f.title}</span>
                            </div>
                        </SplideSlide>
                    ))}
                </SplideTrack>
            </div>
        </Splide>
    );
}