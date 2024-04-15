import Image from "next/image";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import { getCookies } from "@/actions";

const fetchFeed = async (accessToken) => {
  try {
      // Fetch post data from the protected endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/feed`, {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          },
          cache: "no-store",
      });

      if (!response.ok) {
          throw new Error("Failed to fetch feed");
      }

      const postData = await response.json();
      return postData;
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

const checkToken = (token) => {
  if(token) {
      console.log('Token present.')
      return;
  } else {
      // redirect('/login')
  }
};

export default async function Home() {

  // const token = await getCookies();
  // checkToken(token);
  // const aT = token.value;

  // if (isTokenExpired(aT)) {
  //   console.log('Access token has expired');
  //   // redirect('/login');
  //   return;
  // } else {
  //     console.log('Access token is still valid');
  // }

  // const feed = await fetchFeed(aT);


  const posts = await getPosts();
  const feed = posts.reverse();

  return (
    <main className="h-auto antialiased">
      <Navbar />
      <Content feed={feed} data={posts}/>
    </main>
  );
}
