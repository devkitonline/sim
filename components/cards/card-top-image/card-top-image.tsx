import {IconUser} from "@tabler/icons";
import Link from "next/link";

const CardTopImage = ({title, excerpt, noborder,image, author}) => {
    return (
        <div className={"card" + (noborder ? ' no-border' : '')}>
            <div className="card-img-top img-responsive img-responsive-21x9 bo-goc-7" style={{backgroundImage: `url(${image})`}}/>
            <div className="card-body">
                <h2 className="card-title">
                    <Link href='/'>
                        <a style={{fontSize:'1.1rem'}}>{title}</a>
                    </Link>
                </h2>
                <p>{excerpt}</p>
                <i><IconUser/> {author} · 2 giờ trước · XU HƯỚNG CỘNG ĐỒNG</i>
            </div>
        </div>
    )
}
export default CardTopImage;
