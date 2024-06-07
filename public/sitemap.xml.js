const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/posts`;

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
        <loc>https://www.trendstalkhubb.info/</loc>
        <lastmod>2024-05-31</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.trendstalkhubb.info/about</loc>
        <lastmod>2024-05-30</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://www.trendstalkhubb.info/contact-us</loc>
        <lastmod>2024-05-30</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://www.trendstalkhubb.info/blogs</loc>
        <lastmod>2024-05-30</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`https://www.trendstalkhubb.info/blogs/${id}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;