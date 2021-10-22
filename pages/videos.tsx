import Head from 'next/head'
import Base_header from "../components/base/base_header";
import Base_footer from "../components/base/base_footer";
import CardLeftImage from "@/components/cards/card-left-image/card-left-image";
import CardLeftImageNE from "@/components/cards/card-left-image/card-left-image-noexcerpt";
import CardTopImage from "@/components/cards/card-top-image/card-top-image";

const Videos = () => {
    return (
        <div>
            <Head>
                <title>Videos</title>
            </Head>
            <Base_header/>
            <div className="page-wrapper" style={{backgroundColor: '#fff'}}>
                <div className="page-body">
                    <div className="container-xl">
                        <div className='row'>
                            <div className='col-md-8'>
                                <CardTopImage noborder={1} title='Cảm nhận một Sài Gòn nhộn nhịp sau giãn cách qua những bức hình'
                                              excerpt='Cùng theo chân nhiếp ảnh gia Tiến Phùng để cảm nhận sức sống đang tràn về trên các nẻo đường Sài Gòn sau bốn tháng...'/>
                                <hr/>
                                <CardLeftImage noborder={1} title='Cảm nhận một Sài Gòn nhộn nhịp sau giãn cách qua những bức hình'
                                               excerpt='Cùng theo chân nhiếp ảnh gia Tiến Phùng để cảm nhận sức sống đang tràn về trên các nẻo đường Sài Gòn sau bốn tháng...'/>
                            </div>
                            <div className='col-md-4'>
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
            </div>
            <Base_footer/>
        </div>
    )
}

export default Videos;