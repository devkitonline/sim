import Head from 'next/head'
import Page_header from "../components/page_header";
import Page_menu from "../components/page_menu";
import Page_footer from "../components/page_footer";

function Home() {
    return (
        <div>
            <Head>
                <title>Trang chủ</title>
            </Head>
            <Page_header />
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-xl">
                        <h1 className="text-center">Trần Khánh Toàn - Trần Lê Khánh Hồng</h1>
                    </div>
                </div>
            </div>
            <Page_footer/>
        </div>
    )
}

export default Home
