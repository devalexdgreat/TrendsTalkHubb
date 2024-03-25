import Link from "next/link";
import { FiInfo } from "react-icons/fi";
import { GoLaw, GoLinkExternal, GoMegaphone } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiContactsLine } from "react-icons/ri";
import { CiFacebook, CiYoutube } from "react-icons/ci";
import { FaFacebook, FaYoutube } from "react-icons/fa6";
import logoLight from '@/public/logo-light.png'
import logoDark from '@/public/logo-dark.png'
import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-full bg-black text-white py-6">
            <div className="w-[95%] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-12">
                <Link href={'/'} className="duration-500">
                    <Image src={logoLight} className="h-10 w-32" alt="" />
                </Link>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                    <div className="">
                        <span className="flex gap-1 items-center justify-center md:justify-start mb-2">
                            <h1 className="">Quick Links</h1><GoLinkExternal />
                        </span>
                        
                        <div className="flex gap-3 flex-col md:flex-row">
                            <Link href={'/'} className="hover:text-gray-400 duration-500 flex items-center gap-1 justify-center md:justify-start">
                                <span>About Us</span><FiInfo />
                            </Link>
                            <Link href={'/'} className="hover:text-gray-400 duration-500 flex items-center gap-1 justify-center md:justify-start">
                                <span>Contact Us</span><RiContactsLine />
                            </Link>
                            <Link href={'/'} className="hover:text-gray-400 duration-500 flex items-center gap-1 justify-center md:justify-start">
                                <span>Advertise</span><GoMegaphone />
                            </Link>
                            <Link href={'/'} className="hover:text-gray-400 duration-500 flex items-center gap-1 justify-center md:justify-start">
                                <span>Terms & Conditions</span><GoLaw />
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center flex-col">
                        <span className="flex gap-1 items-center mb-2">
                            <h1 className="">Socials</h1>
                        </span>
                        <div className="flex gap-3 text-xl justify-center md:justify-center">
                            <Link href={'/'} className="hover:text-gray-400 duration-500"><FaFacebook /></Link>
                            <Link href={'/'} className="hover:text-gray-400 duration-500"><FaYoutube /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}