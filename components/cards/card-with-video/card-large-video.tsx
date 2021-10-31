import {ICardProps} from "@/components/cards/card-with-video/index";


const CardLargeVideo = (props: ICardProps) => {
    const {title, uploadedDate, views, link} = props;

    return (
        <div className="card no-border" style={{backgroundColor: "rgba(0,0,0,0)", height: "auto"}}>
            <div className="card-body" style={{paddingRight: 0, paddingLeft: 0, height: "500px"}}>
                <iframe allowFullScreen src={link} frameBorder="0" width="100%" height="100%"/>
            </div>
        </div>
    );
}

export default CardLargeVideo;
