import '@/styles/globals.css';
import '@/styles/app.css';
import '@/styles/bulma.css';

import Footer from '@/components/Footer'
import Script from 'next/script';

export const metadata = {
  metadataBase: 'https://octagon-simon.github.io',
  title: 'Simon Ugorji Okorie (also known as the Octagon): Your favourite Software Developer ✨',
  description: 'Simon is an experienced software engineer with a track record of collaborating with businesses to create top-quality software solutions. Additionally, he is a dedicated technical writer, sharing valuable content on platforms like Medium, Hashnode, and Dev.to, with a monthly readership of over 10,000 views. He loves technology and hopes to build his dream company one day.',
  openGraph: {
    title: 'Simon Ugorji Okorie (also known as the Octagon): Your favourite Software Developer ✨',
    description: 'Simon is an experienced software engineer with a track record of collaborating with businesses to create top-quality software solutions. Additionally, he is a dedicated technical writer, sharing valuable content on platforms like Medium, Hashnode, and Dev.to, with a monthly readership of over 10,000 views. He loves technology and hopes to build his dream company one day',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script defer="true" src="/octavalidate.js" />
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-G8TW41FQR2`}
      />

      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G8TW41FQR2');
        `}
      </Script>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
