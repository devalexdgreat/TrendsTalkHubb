import Footer from "./components/Footer";
import "./globals.css";
import localFont from 'next/font/local';
import { Inter, Poppins } from 'next/font/google'

export const metadata = {
  icons: {
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://www.trendstalkhubb.info'),
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
      images: ['https://www.trendstalkhubb.info/favicon.png'], // Must be an absolute URL
      url: "https://www.trendstalkhubb.info",
    },
  openGraph: {
    title: 'TrendsTalk Hubb: Explore the Latest Trends and Insights',
    description: 'Discover insightful articles and discussions on the latest trends across various industries at TrendsTalk Hubb.',
    keywords: "trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis, news, blog",
    url: 'https://www.trendstalkhubb.info',
    siteName: 'TrendsTalk Hubb',
    images: [
      {
        url: 'https://www.trendstalkhubb.info/favicon.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://www.trendstalkhubb.info/favicon.png', // Must be an absolute URL
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
  url: "https://www.trendstalkhubb.info",
  image: "https://www.trendstalkhubb.info/favicon.png",
  siteName: "TrendsTalk Hubb",
  type: "website"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="">
          {children}
          <Footer />
      </body>
    </html>
  );
}