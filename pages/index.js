import Head from 'next/head'
import Base_header from "../components/base/base_header";
import Base_footer from "../components/base/base_footer";

function Home() {
    return (
        <div>
            <Head>
                <title>Trang chủ</title>
            </Head>
            <Base_header />
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-xl">
                        <h1 className="text-center">Trần Khánh Toàn - Trần Lê Khánh Hồng</h1>
                    </div>
                </div>
            </div>
            <Base_footer/>
        </div>
    )
}

export default Home
