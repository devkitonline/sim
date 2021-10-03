import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang={'vi'}>
                <Head>
                    <link rel="icon" href="/favicon.ico"/>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
                    <link rel='stylesheet' href='/tabler.min.css'/>
                    <link rel='stylesheet' href='/tabler-vendors.min.css'/>
                </Head>
                <body className='antialiased '>
                <div className="wrapper">
                    <Main/>
                </div>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src='/tabler.min.js'/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}
