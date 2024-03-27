import Head from "next/head";
import Footer from "./components/Footer";
import "./globals.css";
import localFont from 'next/font/local';

// Define fonts for iPhones/MacBooks and Android/Windows separately
const fontForAppleDevices = localFont({
  src: [
    {
      path: './fonts/Helvetica.ttf', // Replace with your font path for Apple devices
    },
  ],
})

const fontForOtherDevices = localFont({
  src: [
    {
      path: './fonts/Poppins-Light.ttf', // Replace with your font path for other devices
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
  // Detect user-agent to determine the font
  const isAppleDevice = /Mac|iPhone|iPad/.test(navigator.userAgent);
  const fontClass = isAppleDevice ? fontForAppleDevices.className : fontForOtherDevices.className;
  return (
    <html lang="en" className="">
      <Head>
        <link rel="icon" type="image/png" href='/favicon.png' />
      </Head>
      <body className={fontClass}>
          
          {children}
          <Footer />
      </body>
    </html>
  );
}
