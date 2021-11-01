import Head from 'next/head'
import Base_header from "@/components/base/base_header";
import Base_footer from "@/components/base/base_footer";
import AdminMenu from "@/components/base/AdminMenu";

const Admin = () => {
    return (
        <div>
            <Head>
                <title>Admin</title>
            </Head>
            <Base_header/>
            <AdminMenu/>
            <div className="page-wrapper" style={{backgroundColor: '#fff'}}>
                <div className="page-body">
                    <div className="container-sm">
                        <h1>Dashboard</h1>
                    </div>
                </div>
            </div>
            <Base_footer/>
        </div>
    )
}

export default Admin;
