import axios from "axios";

export async function generateMetadata({ params }, parent) {
  const id = params.id;

  // Fetch category data
  const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${id}`);
  const categoryData = categoryResponse.data;

  // Generate metadata
  let metadata = {
    metadataBase: new URL('https://www.trendstalkhubb.info'),
    alternates: {
      canonical: `/blogs/categories/${categoryData.title}`,
      languages: {
        'en-US': `/en-US/blogs/categories/${categoryData.title}`,
        'de-DE': `/de-DE/blogs/categories/${categoryData.title}`,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryData.title} Collection - TrendsTalk Hubb`,
      description: `Explore the latest ${categoryData.title} and summaries of trends and insights across various industries at TrendsTalk Hubb.`,
      siteId: '@TrendsTalkHubb',
      creator: 'TrendsTalkHubb',
      creatorId: '@TrendsTalkHubb',
      url: `https://www.trendstalkhubb.info/blogs/categories/${categoryData.title}`,
    },
    openGraph: {
      title: `${categoryData.title} Collection - TrendsTalk Hubb`,
      description: `Explore the latest ${categoryData.title} and summaries of trends and insights across various industries at TrendsTalk Hubb.`,
      keywords: `${categoryData.title}, categories, posts, trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis, news, blog`,
      type: 'website',
      url: `https://www.trendstalkhubb.info/blogs/categories/${categoryData.title}`,
      siteName: 'TrendsTalk Hubb',
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
    title: `${categoryData.title} Collection - TrendsTalk Hubb`,
    description: `Explore the latest ${categoryData.title} and summaries of trends and insights across various industries at TrendsTalk Hubb.`,
    keywords: `${categoryData.title}, categories, posts, trends, insights, articles, discussions, industry trends, latest trends, blog, blogging, Trending topics, Trend analysis, news, blog`,
    author: "TrendsTalk Hubb",
    url: `https://www.trendstalkhubb.info/blogs/categories/${categoryData.title}`,
    siteName: "TrendsTalk Hubb",
    type: "website",
  };

  // Add images if posts exist
  if (categoryData.posts && categoryData.posts.length > 0) {
    const randomIndex = Math.floor(Math.random() * categoryData.posts.length);
    metadata = {
      ...metadata,
      twitter: {
        ...metadata.twitter,
        images: categoryData.posts[randomIndex].images[0].url, // Must be an absolute URL
      },
      openGraph: {
        ...metadata.openGraph,
        images: categoryData.posts[randomIndex].images[0].url,
      },
      image: categoryData.posts[randomIndex].images[0].url,
    };
  } else {
    // Assign default favicon URL
    metadata = {
      ...metadata,
      twitter: {
        ...metadata.twitter,
        images: '/favicon.png', // Default favicon URL
      },
      openGraph: {
        ...metadata.openGraph,
        images: '/favicon.png',
      },
      image: '/favicon.png',
    };
  }

  return metadata;
}

export default function Layout({ children }) {
  return <div>{children}</div>;
}
