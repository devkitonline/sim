import {FetchApi} from "../../../helpers/fetchApi";

const Post = ({postData}) => {
    return (
        <h1>{postData.post.title}</h1>
    )
}
Post.getInitialProps = async (ctx) => {
    let postData;
    console.log(`${process.env.SITE_URL}/api/post/${ctx.query.id}`);
    await FetchApi.get(`${process.env.SITE_URL}/api/post/${ctx.query.id}`).then(res => {
        postData=res;
    });
    return {
        postData: postData
    }
}
export default Post;
