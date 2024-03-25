import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import localFont from 'next/font/local';

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
  url: "https://www.yourwebsite.com",
  image: "https://www.yourwebsite.com/images/your-image.jpg",
  siteName: "TrendsTalk Hubb",
  type: "website",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <link rel="icon" href="/icon.png" />
      <body className={anyFont.className}>
          
          {children}
          <Footer />
      </body>
    </html>
  );
}
