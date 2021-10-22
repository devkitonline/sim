import Link from "next/link";
import {IconUser} from "@tabler/icons";
import {ICardProps} from "@/components/cards/card-with-video/index";


const CardTopVideo = (props: ICardProps) => {
    const {title, uploadedDate, views, link} = props;

    return (
        <div className="card no-border" style={{backgroundColor: "rgba(0,0,0,0)"}}>
            <iframe src={link} frameBorder="0" width="100%" height="auto">
            </iframe>
            <div className="card-body" style={{paddingRight: 0, paddingLeft: 0}}>
                <h2 className="card-title">
                    <a>{title}</a>
                </h2>
                <i>{views} lượt xem · 2 giờ trước</i>
            </div>
        </div>
    );
}

export default CardTopVideo;
