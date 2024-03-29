import Footer from "./components/Footer";
import "./globals.css";
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google'
import Head from "next/head";
 
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
  openGraph: {
    title: 'TrendsTalk Hubb: Explore the Latest Trends and Insights',
    description: 'Discover insightful articles and discussions on the latest trends across various industries at TrendsTalk Hubb.',
    url: 'https://trendstalkhubb.vercel.app/',
    siteName: 'TrendsTalk Hubb',
    images: [
      {
        url: 'https://trendstalkhubb.vercel.app/favicon.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://trendstalkhubb.vercel.app/favicon.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Trendstalk Hubb.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      <Head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </Head>
      <body className={anyFont.className}>
          {children}
          <Footer />
      </body>
    </html>
  );
}