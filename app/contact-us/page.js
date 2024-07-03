import Image from "next/image"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"
import Link from "next/link"
import { FiInfo } from "react-icons/fi";
import { MdOutlineContactSupport, MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { TiSocialFacebook, TiSocialInstagram, TiSocialYoutube } from "react-icons/ti";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import Footer from "../components/Footer";
  
  export default function Contact() {
    return (
        <div className="w-full mt-20 mb-24">
          <Navbar />
          <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-3 md:gap-8">
            <div className="w-full md:w-8/12 lg:w-9/12 text-black">
              <div className="w-full">
                <div className="text-[13px] flex gap-1 items-center mt-4 mb-4 text-black">
                    <Link href={'/'} className="text-black/80 rounded-md font-normal flex gap-1 items-center hover:text-black/40 duration-500">Home
                    </Link>/
                    <span className="rounded-md font-normal flex gap-1 items-center hover:text-black/40 duration-500">
                        <MdOutlineContactSupport />Contact Us
                    </span>
                </div>
                <h1 className="text-base md:text-xl font-semibold">Reach Us for Any Inquiries</h1>
                <p>
                    Welcome to Trendstalk Hubb&rsquo;s contact page. We&rsquo;re thrilled to hear from you! Whether you have a question about our services, want to collaborate, or simply want to say hello, we&rsquo;re here to help.

                    Please fill out the form below, and we&rsquo;ll get back to you as soon as possible. You can also reach out to us directly via email or phone.

                    Thank you for choosing Trendstalk Hubb. We look forward to connecting with you!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
                <div className="shadow-2xl rounded-md">
                    <div className="w-full bg-black text-white p-4 rounded-t-md">
                        <span className="font-semibold">Quick Contact</span>
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                       <div className="flex justify-between">
                            <div>
                                <span className="flex gap-0.5 items-center font-semibold">
                                    <MdOutlinePhone />
                                    <span className="">Phone</span>
                                </span>
                                <span>+2347036351052</span>
                            </div>
                            <div className="flex items-center">
                                <Link href={'tel: 07036351052'} className="group flex items-center bg-black text-white py-1 px-4 rounded-md">Call<IoChevronForward className="group-hover:translate-x-2 duration-500"/></Link>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <span className="flex gap-0.5 items-center font-semibold">
                                    <MdOutlineEmail />
                                    <span className="">Email</span>
                                </span>
                                <span>Support@trendstalkhubb.com</span>
                            </div>
                            <div className="flex items-center">
                                <Link href={'mailto: Support@trendstalkhubb.com'} className="group flex items-center bg-black text-white py-1 px-4 rounded-md">Mail<IoChevronForward className="group-hover:translate-x-2 duration-500" /></Link>
                            </div>
                        </div> 
                        <div className="">
                            <div className="mb-2">
                                <span className="font-semibold">Socials</span>
                            </div>
                            <div className="flex items-center gap-3 text-xl">
                                <Link href={'/'} className="group flex items-center bg-blue-500 text-white p-1.5 rounded-full hover:scale-125 duration-500"><FaFacebook /></Link>
                                <Link href={'/'} className="group flex items-center bg-gradient-to-tr from-orange-600 to-purple-800 text-white p-1.5 rounded-full hover:scale-125 duration-500"><FaInstagram /></Link>
                                <Link href={'/'} className="group flex items-center bg-red-600 text-white p-1.5 rounded-full hover:scale-125 duration-500"><FaYoutube /></Link>
                                <Link href={'/'} className="group flex items-center bg-green-600 text-white p-1.5 rounded-full hover:scale-125 duration-500"><FaWhatsapp /></Link>
                            </div>
                        </div> 
                    </div>
                    
                </div>
                <div className="shadow-2xl rounded-md flex flex-col gap-1">
                    <div className="w-full p-4 bg-black text-white rounded-t-md">
                        <span className="font-semibold">
                            Let&rsquo;s Stay in Touch
                        </span>
                    </div>
                    <form className="text-sm p-4">
                        <span className="flex flex-col gap-0.5">
                            <label>Name</label>
                            <input type="text" className="rounded-md w-42 ps-2 py-2 text-sm border border-black" placeholder="Name i.e: John Doe" />
                        </span>
                        <span className="flex flex-col gap-0.5 mt-1.5">
                            <label>Email</label>
                            <input type="email" className="rounded-md w-42 ps-2 py-2 text-sm border border-black" placeholder="johndoe@gmail.com" />
                        </span>
                        <div>
                           <span className="flex flex-col gap-0.5 mt-1.5">
                                <span>Message</span>
                                <textarea
                                className="bg-white border border-black h-full w-full rounded-md p-2 resize-none"
                                rows="3"
                                placeholder={`i have a suggestion, let's improve...`}
                                name="message"
                                id="message"
                                ></textarea>
                            </span> 
                        </div>
                        <div className="w-full flex justify-end mt-2">
                            <button type="submit" className="py-1 px-4 bg-black text-white rounded-md group flex gap-1.5 items-center">
                                <span>Send</span><VscSend className="group-hover:translate-x-2 duration-500" />
                            </button>
                        </div>
                    </form>
                </div>
              </div>
            </div>
            <SideBar />
          </div>
          <Footer />
        </div>
    )
  }
  