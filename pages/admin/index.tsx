import Head from 'next/head'
import CardLeftImage from "@/components/cards/card-left-image/card-left-image";
import CardLeftImageNE from "@/components/cards/card-left-image/card-left-image-noexcerpt";
import CardTopImage from "@/components/cards/card-top-image/card-top-image";
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
                    <div className="container-fluid">
                        <div className='row'>
                            <CardLeftImageNE noborder={1} title='Cảm nhận một Sài Gòn nhộn nhịp sau giãn cách qua những bức hình'/>
                            <br/>
                            <CardLeftImageNE noborder={1} title='Cảm nhận một Sài Gòn nhộn nhịp sau giãn cách qua những bức hình'/>
                            <br/>
                            <CardLeftImageNE noborder={1} title='Cảm nhận một Sài Gòn nhộn nhịp sau giãn cách qua những bức hình'/>
                            <br/>
                            <CardLeftImageNE noborder={1} title='Cảm nhận một Sài Gòn nhộn nhịp sau giãn cách qua những bức hình'/>
                            <br/>
                            <CardLeftImageNE noborder={1} title='Cảm nhận một Sài Gòn nhộn nhịp sau giãn cách qua những bức hình'/>
                        </div>
                    </div>
                </div>
            </div>
            <Base_footer/>
        </div>
    )
}

export default Admin;
