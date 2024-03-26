import Head from "next/head";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import localFont from 'next/font/local';
import favicon from '@/public/favicon.png'

const anyFont = localFont({
  src: [
    {
      path: './fonts/Poppins-Light.ttf',
    },
  ],
})

export const metadata = {
  title: "TrendsTalk Hubb: Explore the Latest Trends and Insights",
  description: "Discover insightful articles and discussions on the latest trends across various industries at TrendsTalk Hubb.",
  keywords: "trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis",
  author: "TrendsTalk Hubb",
  url: "https://trendstalkhubb.vercel.app/",
  image: "https://res.cloudinary.com/dew0omszx/image/upload/v1711453760/Trendstalkhubb/r9rljti0ox7epq9x8pss.png",
  siteName: "TrendsTalk Hubb",
  type: "website"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <Head>
        <link rel="icon" type="image/png" href='/favicon.png' />
      </Head>
      <body className={anyFont.className}>
          
          {children}
          <Footer />
      </body>
    </html>
  );
}
