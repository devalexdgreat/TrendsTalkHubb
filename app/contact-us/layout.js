export const metadata = {
  icons: {
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://www.trendstalkhubb.info'),
  alternates: {
    canonical: '/contact-us',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - TrendsTalk Hubb',
    description: "Get in touch with the TrendsTalk Hubb team. We're here to answer your questions, hear your feedback, and explore potential collaborations.",
    siteId: '@TrendsTalkHubb',
    creator: 'TrendsTalkHubb',
    creatorId: '@TrendsTalkHubb',
    images: ['https://www.trendstalkhubb.info/favicon.png'], // Must be an absolute URL
  },
  openGraph: {
    title: 'Contact Us - TrendsTalk Hubb',
    description: "Get in touch with the TrendsTalk Hubb team. We're here to answer your questions, hear your feedback, and explore potential collaborations.",
    url: 'https://www.trendstalkhubb.info/contact-us',
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
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  title: "Contact Us - TrendsTalk Hubb",
  description: "Get in touch with the TrendsTalk Hubb team. We're here to answer your questions, hear your feedback, and explore potential collaborations.",
  keywords: "contact us, contact, TrendsTalk Hubb, feedback, collaboration, questions, inquiries",
  author: "TrendsTalk Hubb",
  url: "https://www.trendstalkhubb.info/contact-us",
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
