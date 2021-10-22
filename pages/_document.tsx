import Document, {Head, Html, Main, NextScript} from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang='vi'>
                <Head>
                    <link rel="icon" href="/favicon.ico"/>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
                    <link rel='stylesheet' href='/styles/css/tabler.min.css'/>
                    <link rel='stylesheet' href='/styles/css/tabler-vendors.min.css'/>
                    <title>Simplyinvest</title>
                </Head>
                <body className='antialiased '>
                <div className="wrapper">
                    <Main/>
                </div>
                <script src='/styles/js/tabler.min.js'/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument;
