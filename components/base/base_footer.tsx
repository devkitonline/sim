import Image from "next/image";
import Link from "next/link";
import {IconBrandFacebook, IconBrandGoogle, IconBrandReddit, IconBrandTwitter, IconBrandYoutube, IconEdit, IconSettings} from "@tabler/icons";

export default function Base_footer() {
    return (
        <footer className="footer footer-transparent d-print-none" style={{backgroundColor: '#f7f5f2'}}>
            <div className="container-sm">
                <div className='row'>
                    <div className='col-md-4'>
                        <a><Image src="/logo.png" width="150" height="40" alt="Tabler" className="img-responsive"/></a><br/>
                        Trang tin tức cập nhật về kinh tế, tài chính, kinh doanh và thị trường dành riêng cho bạn đọc trẻ, yêu thích sự đơn giản.<br/>
                        <b>Email:</b> info@simplyinvest.edu.vn<br/>
                        <b>Phone:</b> 0938 994 127<br/><br/>
                        <h3>Theo dõi chúng tôi</h3>
                        <Link href={'#'}><a><IconBrandFacebook/></a></Link>&nbsp;
                        <Link href={'#'}><a><IconBrandYoutube/></a></Link>&nbsp;
                        <Link href={'#'}><a><IconBrandTwitter/></a></Link>&nbsp;
                        <Link href={'#'}><a><IconBrandGoogle/></a></Link>&nbsp;
                        <Link href={'#'}><a><IconBrandReddit/></a></Link>&nbsp;
                    </div>
                    <div className='col-md-2'>
                        <ul>
                            <Link href={'#'}><li className='list-unstyled'><h3 style={{color: "black"}}>Thành viên</h3></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Đăng ký thành viên</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Đăng nhập</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Trang thành viên</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Khôi phục mật khẩu</h4></li></Link>
                        </ul>
                    </div>
                    <div className='col-md-2'>
                        <ul>
                            <Link href={'#'}><li className='list-unstyled'><h3 style={{color: "black"}}>Chuyên mục</h3></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Vĩ mô</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Đầu tư</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Kinh doanh</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Khởi nghiệp</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Bất động sản</h4></li></Link>
                        </ul>
                    </div>
                    <div className='col-md-2'>
                        <ul>
                            <Link href={'#'}><li className='list-unstyled'><h3 style={{color: "black"}}>Loạt bài</h3></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Tại sao</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Toàn cảnh</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Giải nghĩa</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Covid</h4></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Digital</h4></li></Link>
                        </ul>
                    </div>
                    <div className='col-md-2'>
                        <ul>
                            <Link href={'#'}><li className='list-unstyled'><h3 style={{color: "black"}}>Videos</h3></li></Link>
                            <Link href={'#'}><li className='list-unstyled'><h4 className='cursor-pointer'>Videos</h4></li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
