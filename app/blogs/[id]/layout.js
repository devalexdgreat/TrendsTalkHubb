import axios from "axios";

function convertArrayToStringWithCommas(array) {
  return array.join(', ');
}

function timeSinceCreation(createdDate) {
  // Get the current date
  var currentDate = new Date();

  // Convert the createdDate string to a Date object
  var createdDateObj = new Date(createdDate);

  // Calculate the difference in milliseconds
  var differenceInMs = currentDate - createdDateObj;

  // Convert milliseconds to seconds
  var differenceInSeconds = differenceInMs / 1000;

  // Determine the appropriate time unit
  if (differenceInSeconds < 60) {
      return Math.floor(differenceInSeconds) + " seconds ago";
  } else if (differenceInSeconds < 3600) {
      return Math.floor(differenceInSeconds / 60) + " minutes ago";
  } else if (differenceInSeconds < 86400) {
      return Math.floor(differenceInSeconds / 3600) + " hours ago";
  } else if (differenceInSeconds < 604800) {
      return Math.floor(differenceInSeconds / 86400) + " days ago";
  } else if (differenceInSeconds < 2419200) { // Assuming 7 days as a week
      return Math.floor(differenceInSeconds / 604800) + " weeks ago";
  } else {
      return "more than a month ago";
  }
}

export async function generateMetadata({params, searchParams }, parent) {
  
  const id = params.id;
 
  // fetch data
  const posts = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`);
    const ps = posts.data;
    let realPost = ps.filter(p => p.id == id);
    // console.log(realPost[0].images[0].url);
 
  return {
    metadataBase: new URL('https://trendstalkhubb.vercel.app'),
    alternates: {
      canonical: `/blogs/${id}`,
      languages: {
        'en-US': '/en-US',
        'de-DE': '/de-DE',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: realPost[0].title,
      description: realPost[0].content,
      siteId: '@TrendsTalkHubb',
      creator: 'TrendsTalkHubb',
      creatorId: '@TrendsTalkHubb',
      images: realPost[0].images[0].url,
      url: `https://trendstalkhubb.vercel.app/blogs/${realPost[0].id}`,
      },
    openGraph: {
      title: realPost[0].title,
      description: realPost[0].content,
      keywords: convertArrayToStringWithCommas(realPost[0].tags),
      type: 'article',
      publishedTime: timeSinceCreation(realPost[0].date),
      authors: 'TrendsTalk Hubb',
      url: `https://trendstalkhubb.vercel.app/blogs/${realPost[0].id}`,
      siteName: "TrendsTalk Hubb",
      images: realPost[0].images[0].url,
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
    title: realPost[0].title,
    description: realPost[0].content,
    keywords: convertArrayToStringWithCommas(realPost[0].tags),
    author: "TrendsTalk Hubb",
    url: `https://trendstalkhubb.vercel.app/blogs/${realPost[0].id}`,
    image: realPost[0].images[0].url,
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