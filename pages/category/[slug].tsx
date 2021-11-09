import Head from 'next/head'
import Base_header from "../../components/base/base_header";
import Base_footer from "../../components/base/base_footer";
import CardLeftImage from "@/components/cards/card-left-image/card-left-image";
import CardLeftImageNE from "@/components/cards/card-left-image/card-left-image-noexcerpt";
import CardTopImage from "@/components/cards/card-top-image/card-top-image";
import {FetchApi} from "../../helpers/fetchApi";
import {useState} from "react";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import {query} from "@/lib/db/db";

const btnColor = [
    "blue",
    "azure",
    'indigo',
    'purple',
    "pink",
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'cyan'
]
const colorRand = (s: string) => {
    return btnColor[s.length % 12];
}
const HomeCategory = ({postsNew, categories, videos}) => {
    const [vc, setVC] = useState(videos[0]);
    return (
        <div>
            <Head>
                <title>SimplyInvest - Kênh thông tin kinh tế cho giới trẻ</title>
            </Head>
            <Base_header/>
            <div className="page-wrapper" style={{backgroundColor: '#fff'}}>
                <div className="page-body">
                    <div className="container-sm">
                        <div className='row'>
                            <div className='col-md-8'>
                                <CardTopImage
                                    noborder={1}
                                    title={postsNew[0].title}
                                    image={postsNew[0].image}
                                    author={postsNew[0].author}
                                    excerpt={postsNew[0].excerpt}/>
                                <hr/>
                                <CardLeftImage
                                    noborder={1}
                                    title={postsNew[1].title}
                                    image={postsNew[1].image}
                                    author={postsNew[0].author}
                                    excerpt={postsNew[1].excerpt}/>
                            </div>
                            <div className='col-md-4'>
                                {postsNew.map((post, index) => {
                                    if (2 <= index && index <= 6)
                                        return (
                                            <>
                                                <CardLeftImageNE
                                                    noborder={1}
                                                    image={post.image}
                                                    author={post.author}
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
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-sm">
                        <div className='row'>
                            <div className='col-md-8'>
                                <h1 className="m-4" style={{borderLeft: "3px solid #ffbb01", textTransform: "uppercase", paddingLeft: "5px"}}>VIDEO</h1>
                                {vc ?
                                    <>
                                        <YoutubeEmbed id={vc.id}/>
                                        <br/>
                                        <h2>{vc.name}</h2>
                                        <a target="_blank" href="https://www.youtube.com/channel/UCc7zbfRjxK20QZtSkascI7A/videos">Xem tất cả videos SIMPLY TALK</a>
                                    </>
                                    :
                                    ''
                                }
                            </div>
                            <div className="col-md-4">
                                <h2 className="m-4" style={{borderLeft: "2px solid #ffbb01", textTransform: "uppercase", paddingLeft: "5px"}}>SIMPLYINVEST VIDEO</h2>
                                {videos.map(video => {
                                    return (
                                        <div key={video.id} className="row mt-1" style={{cursor: "pointer"}} onClick={() => setVC(video)}>
                                            <div className="col-4">
                                                <img alt='' className="img-fluid" src={'https://i1.ytimg.com/vi/' + video.id + '/0.jpg'}/>
                                            </div>
                                            <div className="col-8">
                                                <p><b>{video.name}</b><br/><small>{video.views} lượt xem</small></p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
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
                                {postsNew.map((post, index) => {
                                    if (7 <= index && index <= 16)
                                        return (
                                            <>
                                                <CardLeftImageNE
                                                    noborder={1}
                                                    image={post.image}
                                                    author={post.author}
                                                    title={post.title}/>
                                                <br/>
                                            </>
                                        )
                                })}
                            </div>
                            <div className='col-md-4'>
                                <h1 className="m-4" style={{borderLeft: "3px solid #ffbb01", textTransform: "uppercase", paddingLeft: "5px"}}>PHỔ BIẾN</h1>
                                {postsNew.map((post, index) => {
                                    if (17 <= index && index <= 21)
                                        return (
                                            <>
                                                <CardLeftImageNE
                                                    noborder={1}
                                                    image={post.image}
                                                    author={post.author}
                                                    title={post.title}/>
                                                <br/>
                                            </>
                                        )
                                })}
                                <h1 className="m-4 text-center" style={{borderLeft: "3px solid #ffbb01", textTransform: "uppercase", paddingLeft: "5px"}}>CHUYÊN MỤC</h1>
                                <div className="d-grid gap-2 p-4">
                                    {categories.map(category => {
                                        return (
                                            <button key={category.id} className={"btn btn-" + colorRand(category.name)} style={{justifyContent: "start"}}>{category.name}</button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Base_footer/>
        </div>
    )
}
HomeCategory.getInitialProps = async (ctx) => {
    let category = await query("select * from categories where slug=?",[ctx.query.slug]);

    return {
        category: category
    }
}
export default HomeCategory;
