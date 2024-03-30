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
    console.log('hey', posts.data);
    const ps = posts.data;
    let realPost = ps.filter(p => p.id == id);
    console.log(realPost[0].tags.toString());
  
 
  return {
    metadataBase: new URL('https://trendstalkhubb.vercel.app'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
        'de-DE': '/de-DE',
      },
    },
    openGraph: {
      title: realPost[0].title,
      description: realPost[0].content,
      type: 'article',
      publishedTime: timeSinceCreation(realPost[0].date),
      authors: 'TrendsTalk Hubb',
      images: '/favicon.png',
    },
    title: realPost[0].title,
    description: realPost[0].content,
    keywords: convertArrayToStringWithCommas(realPost[0].tags),
    author: "TrendsTalk Hubb",
    url: `https://trendstalkhubb.vercel.app/blogs/${realPost[0].id}`,
    image: "https://res.cloudinary.com/dew0omszx/image/upload/v1711453760/Trendstalkhubb/r9rljti0ox7epq9x8pss.png",
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