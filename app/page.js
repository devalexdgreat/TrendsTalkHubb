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

// function isTokenExpired(token) {
//   if (!token) {
//       // If token is not provided, consider it as expired
//       return true;
//   }

//   try {
//       // Decode the token
//       const payload = JSON.parse(atob(token.split('.')[1]));

//       // Get the expiration time (exp) from the payload
//       const expirationTime = payload.exp * 1000; // Convert to milliseconds

//       // Check if the current time is after the expiration time
//       return Date.now() >= expirationTime;
//   } catch (error) {
//       // If decoding fails, consider the token as expired
//       return true;
//   }
// }

// const checkToken = (token) => {
//   if(token) {
//       console.log('Token present.')
//       return;
//   } else {
//       // redirect('/login')
//   }
// };

export default async function Home() {

  const posts = await getPosts();
  const feed = await fetchFeed();

  return (
    <main className="h-auto antialiased">
      <Navbar />
      <Content feed={feed} data={posts}/>
    </main>
  );
}
