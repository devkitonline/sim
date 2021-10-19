import Link from 'next/link';
import {useEffect, useState} from "react";
import {FetchApi} from "../../helpers/fetchApi";

const Base_menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [menuLoaded, setMenuLoaded] = useState(false);
    useEffect(() => {
        if (!menuLoaded) {
            setMenuLoaded(true);
            FetchApi.get('/api/menu').then(res => {
                setMenuItems(res.menus);
            });
        }
    }, [menuItems]);
    return (
        <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                <ul className="navbar-nav">
                    {menuItems.map(item => {
                        return (item.children.length > 0 ?
                            <li key={item.name} className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                    <span className="nav-link-title text-menu-header">{item.name}</span>
                                </a>
                                <div className="dropdown-menu">
                                    <div className="dropdown-menu-columns">
                                        <div className="dropdown-menu-column">
                                            {item.children.map(sub_item => {
                                                return (<Link key={sub_item.name} href={sub_item.link}>
                                                    <a className="dropdown-item">
                                                        {sub_item.name}
                                                    </a>
                                                </Link>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            :
                            <li key={item.name} className="nav-item">
                                <Link href={item.link}>
                                    <a className='nav-link'>
                                        <span className="nav-link-title text-menu-header">{item.name}</span>
                                    </a>
                                </Link>
                            </li>)
                    })}
                </ul>
            </div>
        </div>
    )
}


export default Base_menu;
