import {IconUser} from "@tabler/icons";
import Link from "next/link";

const CardLeftImageNE = ({title, noborder}) => {
    return (
        <div className={"card" + (noborder ? ' no-border' : '')}>
            <div className="row row-0">
                <div className="col-4">
                    <img src="/images/sgaliveagaintinphung-34-536x356.jpg" className="w-100 h-100 object-cover bo-goc-7" alt="Card side image"/>
                </div>
                <div className="col">
                    <div className="card-body">
                        <h2 className="card-title">
                            <Link href=''>
                                <a>{title}</a>
                            </Link>
                        </h2>
                        <i><IconUser/> Agnes A · 27/09/2021</i>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardLeftImageNE;
