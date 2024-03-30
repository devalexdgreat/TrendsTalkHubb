export const metadata = {
    icons: {
      apple: '/apple-icon.png',
    },
    metadataBase: new URL('https://trendstalkhubb.vercel.app'),
      alternates: {
        canonical: '/about',
        languages: {
          'en-US': '/en-US',
          'de-DE': '/de-DE',
        },
      },
    twitter: {
    card: 'summary_large_image',
    title: 'About Us',
    description: "Trendstalk Hubb is more than just a platform – it's a dynamic hub where curiosity meets insight, and where trends are not just observed, but actively shaped.",
    siteId: '@TrendsTalkHubb',
    creator: 'TrendsTalkHubb',
    creatorId: '@TrendsTalkHubb',
    images: ['https://trendstalkhubb.vercel.app/favicon.png'], // Must be an absolute URL
    },
    openGraph: {
      title: 'About Us - TrendsTalk Hubb',
      description: "Trendstalk Hubb is more than just a platform – it's a dynamic hub where curiosity meets insight, and where trends are not just observed, but actively shaped.",
      url: 'https://trendstalkhubb.vercel.app/about',
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
    title: "About Us - TrendsTalk Hubb",
    description: "Trendstalk Hubb is more than just a platform – it's a dynamic hub where curiosity meets insight, and where trends are not just observed, but actively shaped.",
    keywords: "trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis, news, blog",
    author: "TrendsTalk Hubb",
    url: "https://trendstalkhubb.vercel.app/about",
    image: "https://trendstalkhubb.vercel.app/favicon.png",
    siteName: "TrendsTalk Hubb",
    type: "website"
  };


export default function Layout({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}