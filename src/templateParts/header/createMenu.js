import React from 'react';
import {Link} from 'react-router-dom';

const CreateMenu = (props) =>{
    let template = null;
    const checkActive = ((window.location.pathname===props.hrefLink) || (props.hrefLink !== "/" && window.location.pathname.includes(props.hrefLink))) ? 'active' : '';

    switch(props.menuType)
    {
        case('singleInNavbar') :
            template = (
                <li className={`nav-item ${props.additionalClass} ${checkActive}`}>
                    <Link 
                        className="nav-link" 
                        to={props.hrefLink}
                    >
                        {props.menuTitle}
                    </Link>
                </li>
            );
            break;
        case('Dropdown') :
            template = (
                <li className={`nav-item dropdown ${checkActive} ${props.additionalClass}`}>
                    <Link 
                        className="nav-link dropdown-toggle" 
                        to={props.hrefLink}
                        id="navbarDropdown" 
                        role="button" 
                       >
                            {props.menuTitle}
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    { props.dropDownMenuLink.map( (item, i) =>
                            {
                                return (
                                    <Link 
                                        to={item.Link}
                                        className='dropdown-item'> 
                                            {item.DropMenuTitle}
                                    </Link>)
                            }) }
                    </div>
                </li>
            );
            break;
        case('singleInSidebar') :
            template = (
                    <div className={`sidebar-item border-top border-bottom ${checkActive}`}>
                    <Link 
                        to={props.hrefLink}
                    >
                        {props.menuTitle}
                    </Link>
                    </div>
            );
            break;
        default :
            template = null;
    }
    return template
}
export default CreateMenu;