import {IconUser} from "@tabler/icons";
import Link from "next/link";

const CardTopImage = ({title, excerpt, noborder}) => {
    return (
        <div className={"card" + (noborder ? ' no-border' : '')}>
            <div className="card-img-top img-responsive img-responsive-21x9 bo-goc-7" style={{backgroundImage: 'url(/images/sgaliveagaintinphung-34-536x356.jpg)'}}/>
            <div className="card-body">
                <h2 className="card-title">
                    <Link href='/'>
                        <a>{title}</a>
                    </Link>
                </h2>
                <p>{excerpt}</p>
                <i><IconUser/> Agnes A · 2 giờ trước · XU HƯỚNG CỘNG ĐỒNG</i>
            </div>
        </div>
    )
}
export default CardTopImage;
