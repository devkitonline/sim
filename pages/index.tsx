import Head from 'next/head'
import Base_header from "../components/base/base_header";
import Base_footer from "../components/base/base_footer";
import CardLeftImage from "@/components/cards/card-left-image/card-left-image";
import CardLeftImageNE from "@/components/cards/card-left-image/card-left-image-noexcerpt";
import CardTopImage from "@/components/cards/card-top-image/card-top-image";
import {FetchApi} from "../helpers/fetchApi";
import {useEffect, useState} from "react";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import Link from "next/link";
import {IconClock, IconEdit, IconEye, IconTrash, IconUser} from "@tabler/icons";

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
const Home = ({postsNew, categories, videos}) => {
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
Home.getInitialProps = async (ctx) => {
    let videos = [
        {
            name: "SIMPLY TALK 2: NGUY VÀ CƠ NỮA CUỐI 2021",
            id: 'jeCGvX9tKlo',
            views: 23135
        },
        {
            id: 'VpN1L5g06tw',
            name: "Vì sao Venezuela lại có lạm phát phi mã?",
            views: 47567
        },
        {
            id: 'ojsl-R0tCgI',
            name: "Chiến tranh tiền tệ là gì và nó ảnh hưởng đến bạn như thế nào?",
            views: 22347
        },
        {
            id: '1WVTzOnLju4',
            name: "End Game vs Avatar, ai thắng? Sẽ ra sao nếu Avatar ra mắt năm 2019",
            views: 23135
        },
        {
            id: 'wljNheIy3Cw',
            name: "Lãi suất là gì và ngân hàng kiếm tiền như thế nào?",
            views: 41978
        },
    ];
    let postsNew = [];
    let categories = [];
    const postData = {
        "conditions": [],
        "logicalOperator": "OR",
        "limit": 22,
        "offset": 0,
        orderBy: "date_created",
        order: "desc"
    }
    await FetchApi.post(process.env.SITE_URL + '/api/post/filter', postData).then(res => {
        if (res.code == 1) {
            postsNew = res.data;
        }
    });
    await FetchApi.get(process.env.SITE_URL + '/api/category').then(res => {
        if (res.code == 1) {
            categories = res.data;
        }
    });
    return {
        postsNew: postsNew,
        categories: categories,
        videos: videos
    }
}
export default Home
