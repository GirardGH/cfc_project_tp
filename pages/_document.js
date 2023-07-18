import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html className=''>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body className=''>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}