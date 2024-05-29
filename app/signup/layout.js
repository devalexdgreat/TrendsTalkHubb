export const metadata = {
    icons: {
      apple: '/apple-icon.png',
    },
    metadataBase: new URL('https://www.trendstalkhubb.info'),
    alternates: {
      canonical: '/signup',
      languages: {
        'en-US': '/en-US',
        'de-DE': '/de-DE',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sign Up - TrendsTalk Hubb',
      description: "Join TrendsTalk Hubb and be part of a vibrant community where you can explore the latest trends, share insights, and connect with like-minded individuals.",
      siteId: '@TrendsTalkHubb',
      creator: 'TrendsTalkHubb',
      creatorId: '@TrendsTalkHubb',
      images: ['https://www.trendstalkhubb.info/favicon.png'],
    },
    openGraph: {
      title: 'Sign Up - TrendsTalk Hubb',
      description: "Join TrendsTalk Hubb and be part of a vibrant community where you can explore the latest trends, share insights, and connect with like-minded individuals.",
      url: 'https://www.trendstalkhubb.info/signup',
      siteName: 'TrendsTalk Hubb',
      images: [
        {
          url: 'https://www.trendstalkhubb.info/favicon.png',
          width: 800,
          height: 600,
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
    title: "Sign Up - TrendsTalk Hubb",
    description: "Join TrendsTalk Hubb and be part of a vibrant community where you can explore the latest trends, share insights, and connect with like-minded individuals.",
    keywords: "sign up, register, TrendsTalk Hubb, trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis, news, blog",
    author: "TrendsTalk Hubb",
    url: "https://www.trendstalkhubb.info/signup",
    image: "https://www.trendstalkhubb.info/favicon.png",
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