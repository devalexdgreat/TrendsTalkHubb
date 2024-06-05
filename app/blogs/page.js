import Image from "next/image";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import { getCookies } from "@/actions";

const fetchFeed = async () => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?limit=${5}`, {
          cache: "no-store",
      });

      if (!response.ok) {
          throw new Error("Failed to fetch feed");
      }

      return response.json();

  } catch (error) {
      console.error(error);
  }
};

const getPosts = async () => {
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
          cache: "no-store",
      });

      if (!res.ok) {
          throw new Error("Failed to fetch Projects");
      }

      return res.json();
      
  } catch (error) {
      console.log(error);
  }
}

export default async function BlogHome() {

  const posts = await getPosts();
  const feed = await fetchFeed();

  return (
    <main className="h-auto antialiased">
      <Navbar />
      <Content feed={feed} data={posts}/>
    </main>
  );
}
