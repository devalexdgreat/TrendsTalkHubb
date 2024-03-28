import Image from "next/image";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

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

export default async function Home() {

  const posts = await getPosts();
  console.log("heeloo", posts);

  return (
    <main className="h-auto antialiased">
      <Navbar />
      <Content data={posts}/>
    </main>
  );
}
