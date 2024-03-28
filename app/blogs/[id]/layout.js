import axios from "axios";

function convertArrayToStringWithCommas(array) {
  return array.join(', ');
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