export const metadata = {
    icons: {
      apple: '/apple-icon.png',
    },
    metadataBase: new URL('https://www.trendstalkhubb.info'),
      alternates: {
        canonical: '/admin',
        languages: {
          'en-US': '/en-US',
          'de-DE': '/de-DE',
        },
      },
    twitter: {
    card: 'summary_large_image',
    title: 'Admin - TrendsTalk Hubb',
    description: "Discover more about TrendsTalk Hubb – your dynamic hub where curiosity meets insight, and where trends are not just observed, but actively shaped.",
    siteId: '@TrendsTalkHubb',
    creator: 'TrendsTalkHubb',
    creatorId: '@TrendsTalkHubb',
    images: ['https://www.trendstalkhubb.info/favicon.png'], // Must be an absolute URL
    },
    openGraph: {
      title: 'Admin - TrendsTalk Hubb',
      description: "Discover more about TrendsTalk Hubb – your dynamic hub where curiosity meets insight, and where trends are not just observed, but actively shaped.",
      url: 'https://www.trendstalkhubb.info/admin',
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
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    title: "Admin - TrendsTalk Hubb",
    description: "Discover more about TrendsTalk Hubb – your dynamic hub where curiosity meets insight, and where trends are not just observed, but actively shaped.",
    keywords: "about us, about, TrendsTalk Hubb, trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis, news, blog",
    author: "TrendsTalk Hubb",
    url: "https://www.trendstalkhubb.info/admin",
    image: "https://www.trendstalkhubb.info/favicon.png",
    siteName: "TrendsTalk Hubb",
    type: "website"
  };


export default function Layout({ children }) {
    return (
        <div className="">
            {children}
        </div>
    );
}