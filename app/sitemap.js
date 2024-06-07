import fetchServer from "@/utils/fetchServer";

export default async function sitemap() {
    // const { posts } = await fetchServer(`posts`);
    const response = await fetch(`https://trendstalk-blog-api.onrender.com/api/posts`);
    const posts = await response.json();
    const dateK = '2024-05-04T21:20:09.533Z';

    const postEntries = posts.map(({ id, date }) => ({
        url: `https://www.trendstalkhubb.info/blogs/${id}`,
        lastModified: date,
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    return [
        {
            url: 'https://www.trendstalkhubb.info',
            lastModified: dateK,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://www.trendstalkhubb.info/about',
            lastModified: dateK,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://www.trendstalkhubb.info/contact-us',
            lastModified: dateK,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://www.trendstalkhubb.info/blogs',
            lastModified: dateK,
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...postEntries
    ];
}