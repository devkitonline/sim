import Link from 'next/link';
import {useEffect, useState} from "react";
import axios from "axios";

const Base_menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        axios.get('/api/base/menu').then(res => setMenuItems(res.data));
    }, []);
    return (
        <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                <ul className="navbar-nav">
                    {menuItems.map(item => {
                        return (item.has_child ?
                            <li key={item.name} className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                    <span className="nav-link-title">{item.name}</span>
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
                                        <span className="nav-link-title">{item.name}</span>
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
