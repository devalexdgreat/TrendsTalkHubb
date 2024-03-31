import Footer from "./components/Footer";
import "./globals.css";
import localFont from 'next/font/local';
import { Inter, Poppins } from 'next/font/google'
import Head from "next/head";
 
// const anyFont = Poppins({
//   subsets: ['latin'],
//   display: "swap",
//   weight: ["100", "200", "300"]
// })

const anyFont = localFont({
  src: [
    {
      path: './fonts/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
  ],
})

export const metadata = {
  icons: {
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://trendstalkhubb.vercel.app'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
        'de-DE': '/de-DE',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: "TrendsTalk Hubb: Explore the Latest Trends and Insights",
      description: 'Discover insightful articles and discussions on the latest trends across various industries at TrendsTalk Hubb.',
      siteId: '@TrendsTalkHubb',
      creator: 'TrendsTalkHubb',
      creatorId: '@TrendsTalkHubb',
      images: ['https://trendstalkhubb.vercel.app/favicon.png'], // Must be an absolute URL
      },
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
    <html lang="en" className={anyFont.className}>
      <Head>
      </Head>
      <body className="">
          {children}
          <Footer />
      </body>
    </html>
  );
}