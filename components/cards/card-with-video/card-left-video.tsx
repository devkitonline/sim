import {ICardProps} from "@/components/cards/card-with-video/index";
import Link from "next/link";
import {IconClock, IconEye} from "@tabler/icons";

const CardLeftVideo = (props: ICardProps) => {
    const {title, uploadedDate, views, link} = props;
    return (
        <div className="card no-border">
            <div className="row row-0">
                <div className="col-4">
                    <iframe src={link} frameBorder="0" width="100%" height="auto">
                    </iframe>
                </div>
                <div className="col">
                    <div className="card-body">
                        <h2 className="card-title">
                            <Link href='/'>
                                <a>{title}</a>
                            </Link>
                        </h2>
                        <i><IconEye/> {views} lượt xem · <IconClock/> 2 giờ trước</i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardLeftVideo;
