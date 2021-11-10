import Head from 'next/head'
import Base_header from "../../components/base/base_header";
import Base_footer from "../../components/base/base_footer";
import {FetchApi} from "../../helpers/fetchApi";
import CardTopImage from "@/components/cards/card-top-image/card-top-image";
import CardLeftImage from "@/components/cards/card-left-image/card-left-image";
import CardLeftImageNE from "@/components/cards/card-left-image/card-left-image-noexcerpt";

const HomeCategory = ({category,posts}) => {
    return (
        <>
            <Head>
                <title>{category.name} - SimplyInvest</title>
            </Head>
            <Base_header/>
            <div className="page-wrapper" style={{backgroundColor: '#fff'}}>
                <div className="page-body">
                    <div className="container-sm">
                        <div className='row'>
                            <h1 className="text-center hhh">{category.name}</h1>
                        </div>
                        <div className='row'>
                            <div className='col-md-8'>
                                <CardTopImage
                                    noborder={1}
                                    title={posts[0].title}
                                    image={posts[0].image}
                                    author={posts[0].authorName}
                                    excerpt={posts[0].excerpt}/>
                                <hr/>
                                <CardLeftImage
                                    noborder={1}
                                    title={posts[1].title}
                                    image={posts[1].image}
                                    author={posts[0].authorName}
                                    excerpt={posts[1].excerpt}/>
                            </div>
                            <div className='col-md-4'>
                                {posts.map((post, index) => {
                                    if (2 <= index && index <= 6)
                                        return (
                                            <>
                                                <CardLeftImageNE
                                                    noborder={1}
                                                    image={post.image}
                                                    author={post.authorName}
                                                    title={post.title}/>
                                                <br/>
                                            </>
                                        )
                                })}
                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-wrapper" style={{backgroundColor: '#fff'}}>
                <div className="page-body">
                    <div className="container-sm">
                        <div className='row'>
                            <div className='col-md-8'>
                                <h1 className="m-4" style={{borderLeft: "3px solid #ffbb01", textTransform: "uppercase", paddingLeft: "5px"}}>GẦN ĐÂY</h1>
                                {posts.map((post, index) => {
                                    if (7 <= index && index <= 11)
                                        return (
                                            <>
                                                <CardLeftImageNE
                                                    noborder={1}
                                                    image={post.image}
                                                    author={post.authorName}
                                                    title={post.title}/>
                                                <br/>
                                            </>
                                        )
                                })}
                            </div>
                            <div className='col-md-4'>
                                <h1 className="m-4" style={{borderLeft: "3px solid #ffbb01", textTransform: "uppercase", paddingLeft: "5px"}}>PHỔ BIẾN</h1>
                                {posts.map((post, index) => {
                                    if (12 <= index && index <= 16)
                                        return (
                                            <>
                                                <CardLeftImageNE
                                                    noborder={1}
                                                    image={post.image}
                                                    author={post.authorName}
                                                    title={post.title}/>
                                                <br/>
                                            </>
                                        )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Base_footer/>
        </>
    )
}
HomeCategory.getInitialProps = async (ctx) => {
    let category, posts;
    await FetchApi.post(process.env.SITE_URL + '/api/public/category', {slug: ctx.query.slug}).then(res => {
        category = res.data;
    });
    await FetchApi.post(process.env.SITE_URL + '/api/public/postsbycategory', {id: category.id}).then(res => {
        posts = res.data;
    });
    return {
        category: category,
        posts: posts
    }
}
export default HomeCategory;
