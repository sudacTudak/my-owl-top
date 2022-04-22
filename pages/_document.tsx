import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

class MyDocument extends Document {

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang='ru'>
        <Head />
        <link
          rel="preload"
          href='/fonts/NotoSans-ExtraLight.woff2'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-ExtraLight.woff'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-Light.woff2'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-Light.woff'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-Regular.woff2'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-Regular.woff'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-Medium.woff2'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-Medium.woff'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-SemiBold.woff2'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-SemiBold.woff'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-Bold.woff2'
          as="font"
          crossOrigin=''
        />
        <link
          rel="preload"
          href='/fonts/NotoSans-Bold.woff'
          as="font"
          crossOrigin=''
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
