import Image from "next/image";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import { getCookies } from "@/actions";
import fetchServer from "@/utils/fetchServer";

export default async function Home() {

  const posts = await fetchServer(`posts?limit=${12}`);
  const feed = await fetchServer(`posts?limit=${5}`);

  return (
    <main className="h-auto antialiased">
      <Navbar />
      <Content feed={feed} data={posts}/>
    </main>
  );
}
