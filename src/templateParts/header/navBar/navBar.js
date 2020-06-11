import React, {Component} from 'react';
import CreateMenu from '../createMenu';
import SideBar from '../SideBar/sideBar';
import './navBar.css';


class NavBar extends Component{

    SideNavigation = (menuItems) => {
        
        return <SideBar menuItems = {menuItems} userProfile = {this.props.userProfile} userLogout = {this.props.userLogout}/>

    }
    render(){
        const menuItems = [{
            menuTitle: "Home",
            hrefLink: "/",
            additionalClass: ""      
        },
        {
            menuTitle: "Customer",
            hrefLink: "/customer",
            additionalClass: "ml-3"
        },
        {
            menuTitle: "Product",
            hrefLink: "/product",
            additionalClass: "ml-3"
        }]
    
        return(<div id="menu-wrapper">
            {this.SideNavigation(menuItems)}
            <div className="navbar-wrapper d-none d-md-block">
                <div className="container">
                    <div className="row justify-content-between">
                        <nav className="navbar navbar-expand-md navbar-skin justify-content-end">
                            <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                { menuItems.map((item, i) =>{
                                    return <CreateMenu key = {i} menuType = "singleInNavbar" menuTitle = {item.menuTitle} hrefLink = {item.hrefLink} additionalClass = {item.additionalClass}/>
                                }) }                 
                            </ul>
                            </div>
                        </nav>
                        <span className="text-white navbar-logout" onClick = {this.props.userLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </span>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default NavBar;