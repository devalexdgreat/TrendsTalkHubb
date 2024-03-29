import Footer from "./components/Footer";
import "./globals.css";
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google'
 
const anyFont = Poppins({
  weight: '300',
  subsets: ['latin'],
})

// const anyFont = localFont({
//   src: [
//     {
//       path: './fonts/Poppins-Regular.ttf', // Replace with your font path for Apple devices
//     },
//   ],
// })

export const metadata = {
  title: "TrendsTalk Hubb: Explore the Latest Trends and Insights",
  description: "Discover insightful articles and discussions on the latest trends across various industries at TrendsTalk Hubb.",
  keywords: "trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis, news, blog",
  author: "TrendsTalk Hubb",
  url: "https://trendstalkhubb.vercel.app/",
  image: "https://trendstalkhubb.vercel.app/favicon.png",
  siteName: "TrendsTalk Hubb",
  type: "website"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={anyFont.className}>
          {children}
          <Footer />
      </body>
    </html>
  );
}