import axios from "axios";

export async function generateMetadata({params, searchParams }, parent) {
  
  const id = params.id;
 
  // fetch data
  const posts = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?tags=${id}`);
  const ps = posts.data;
 
  return {
    metadataBase: new URL('https://trendstalkhubb.vercel.app'),
    alternates: {
      canonical: `/blogs/tags/${id}`,
      languages: {
        'en-US': `/en-US/blogs/tags/${id}`,
        'de-DE': `/de-DE/blogs/tags/${id}`,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${id} Tag - TrendsTalk Hubb`,
      description: `Explore posts tagged with "${id}" and stay updated on the latest trends and insights across various industries at TrendsTalk Hubb.`,
      siteId: '@TrendsTalkHubb',
      creator: 'TrendsTalkHubb',
      creatorId: '@TrendsTalkHubb',
      images: ['https://trendstalkhubb.vercel.app/favicon.png'], // Must be an absolute URL
      },
    openGraph: {
      title: `${id} Tag - TrendsTalk Hubb`,
      description: `Explore posts tagged with "${id}" and stay updated on the latest trends and insights across various industries at TrendsTalk Hubb.`,
      type: 'website',
      url: `https://trendstalkhubb.vercel.app/blogs/tags/${id}`,
      siteName: 'TrendsTalk Hubb',
      images: '/favicon.png',
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
    title: `${id} Tag - TrendsTalk Hubb`,
    description: `Explore posts tagged with "${id}" and stay updated on the latest trends and insights across various industries at TrendsTalk Hubb.`,
    keywords: `${id}, posts, trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis, news, blog`,
    author: "TrendsTalk Hubb",
    url: `https://trendstalkhubb.vercel.app/blogs/tags/${id}`,
    image: "https://trendstalkhubb.vercel.app/favicon.png",
    siteName: "TrendsTalk Hubb",
    type: "website",
  }

}

export default function Layout({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}