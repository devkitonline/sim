import Link from 'next/link';
import axios from "axios";

const Base_menu = ({menuItems}) => {
    console.log(menuItems);
    return (
        <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                <ul className="navbar-nav">
                    {menuItems.map(item => {
                        item.has_child ?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                    <span className="nav-link-title">{item.name}</span>
                                </a>
                                <div className="dropdown-menu">
                                    <div className="dropdown-menu-columns">
                                        <div className="dropdown-menu-column">
                                            {item.children.map(sub_item => {
                                                <Link href={sub_item.link}>
                                                    <a className="dropdown-item">
                                                        {sub_item.name}
                                                    </a>
                                                </Link>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            :
                            <li className="nav-item">
                                <Link href={item.link}>
                                    <a className='nav-link'>
                                        <span className="nav-link-title">{item.name}</span>
                                    </a>
                                </Link>
                            </li>
                    })}
                </ul>
            </div>
        </div>
    )
}


export default Base_menu;
