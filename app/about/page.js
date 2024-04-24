import Image from "next/image"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"
import Link from "next/link"
import { FiInfo } from "react-icons/fi";
  
  export default function About() {
    return (
        <div className="w-full mt-20 mb-24">
          <Navbar />
          <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-3 md:gap-8">
            <div className="w-full md:w-8/12 lg:w-9/12 text-black">
              <div>
                <div className="text-[13px] flex gap-1 items-center mt-4 mb-4 text-black">
                    <Link href={'/'} className="text-black/80 rounded-md font-normal flex gap-1 items-center hover:text-black/40 duration-500">Home
                    </Link>/
                    <span className="rounded-md font-normal flex gap-1 items-center hover:text-black/40 duration-500">
                        <FiInfo />About Us
                    </span>
                </div>
                <h1 className="text-base md:text-xl font-semibold" title="About Us">About TrendsTalkHubb</h1>
              </div>
              <div className="mt-3 w-full md:w-9/12 mb-12">
                <p className="mb-2">
                  Welcome to <span className="font-semibold">Trendstalk Hubb</span>, your go-to platform for exploring the latest trends and insights across various industries.
                </p>
                <p className="mb-4">
                  At Trendstalk Hubb, we&rsquo;re passionate about staying ahead of the curve and uncovering the trends that shape the future. Whether you&rsquo;re interested in technology, business, health, fashion, or any other field, we&rsquo;re here to provide you with in-depth analysis, thought-provoking articles, and engaging discussions.
                </p>
                <div>
                  <span className="text-base md:text-xl font-semibold">Our Mission</span>
                  <p className="mb-2" title="Our Mission">
                    Is to empower individuals and organizations with the knowledge and foresight they need to thrive in a rapidly evolving world. Through our curated content, expert opinions, and community-driven approach, we aim to inspire curiosity, foster innovation, and drive positive change.
                  </p>
                </div>
                
                <p className="mb-2">
                  But Trendstalk Hubb is more than just a source of information – it’s a dynamic hub of ideas, insights, and inspiration. Our diverse community of trendsetters, thought leaders, and industry professionals come together to share their expertise, exchange ideas, and collaborate on projects that push the boundaries of what’s possible.
                </p>
                <p className="mb-2">
                  From groundbreaking research and cutting-edge technology to emerging trends and cultural phenomena, Trendstalk Hubb is your window into the future. Join us as we explore the trends that shape our world, connect with like-minded individuals, and embark on a journey of discovery and growth.
                </p>
                <p className="mb-3">
                  Together, let’s navigate the ever-changing landscape of trends and insights, and chart a course towards a brighter, more innovative future.
                </p>
                <p className="mb-4">
                  Welcome to Trendstalk Hubb – where the conversation never ends, and the possibilities are endless.
                </p>
                <Link href={'/contact-us'} className="bg-black text-white py-2 px-4 rounded-md hover:bg-black/80 duration-500">Get In Touch</Link>
              </div>
            </div>
            <SideBar />
          </div>
        </div>
    )
  }
  