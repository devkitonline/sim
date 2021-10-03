import Head from 'next/head'
import Base_header from "../components/base/base_header";
import Base_footer from "../components/base/base_footer";
import axios from "axios";

const Home = (menuItems) => {
    return (
        <div>
            <Head>
                <title>Trang chủ</title>
            </Head>
            <Base_header menuItems={menuItems}/>
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
export const getServerSideProps = async () => {
    const res = await axios.get('http://localhost:3000/api/base/menu');
    const menuItems = res.data;
    return {
        props: {
            menuItems
        }
    }
}
export default Home
