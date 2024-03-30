import Image from "next/image";
import logoLight from '@/public/logo-light.png'
import logoDark from '@/public/logo-dark.png'

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="h-screen w-full flex justify-center items-center bg-white text-black fixed top-0">
            <div className="text-center flex flex-col justify-center items-center">
                <Image src={logoDark} className="h-10 w-32" alt="" />
                <div class="loader mt-5">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                    <div className="bar4"></div>
                    <div className="bar5"></div>
                    <div className="bar6"></div>
                    <div className="bar7"></div>
                    <div className="bar8"></div>
                    <div className="bar9"></div>
                    <div className="bar10"></div>
                    <div className="bar11"></div>
                    <div className="bar12"></div>
                </div>
            </div>
        </div>
    );
  }