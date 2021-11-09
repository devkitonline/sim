const YoutubeEmbed = ({id}) => (
    <div className="video-wrapper">
        <iframe width="928" height="522" src={"https://www.youtube.com/embed/"+id} title="YouTube" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen/>
    </div>
)
export default YoutubeEmbed;
