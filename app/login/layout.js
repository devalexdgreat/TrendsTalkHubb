export const metadata = {
    icons: {
      apple: '/apple-icon.png',
    },
    metadataBase: new URL('https://trendstalkhubb.vercel.app'),
      alternates: {
        canonical: '/login',
        languages: {
          'en-US': '/en-US',
          'de-DE': '/de-DE',
        },
      },
    twitter: {
    card: 'summary_large_image',
    title: 'Login - TrendsTalk Hubb',
    description: "Sign in to TrendsTalk Hubb and join the conversation on the latest trends and insights across various industries.",
    siteId: '@TrendsTalkHubb',
    creator: 'TrendsTalkHubb',
    creatorId: '@TrendsTalkHubb',
    images: ['https://trendstalkhubb.vercel.app/favicon.png'], // Must be an absolute URL
    },
    openGraph: {
      title: 'Login - TrendsTalk Hubb',
      description: "Sign in to TrendsTalk Hubb and join the conversation on the latest trends and insights across various industries.",
      url: 'https://trendstalkhubb.vercel.app/login',
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
    title: "Login - TrendsTalk Hubb",
    description: "Sign in to TrendsTalk Hubb and join the conversation on the latest trends and insights across various industries.",
    keywords: "login, sign in, authentication, trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis, news, blog",
    author: "TrendsTalk Hubb",
    url: "https://trendstalkhubb.vercel.app/login",
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