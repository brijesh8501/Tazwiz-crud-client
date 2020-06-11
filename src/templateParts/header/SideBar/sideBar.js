import React, {Component} from 'react';
import CreateMenu from '../createMenu';
import './sideBar.css';

class SideBar extends Component{
    closeNav(){
        document.getElementById("mySidenav").style.width = "0";
    }
    render(){
        return(
            <div id="mySidenav" className="sidenav d-flex flex-column justify-content-between">
            <a className="closebtn" onClick={this.closeNav}>&times;</a>
            <div className="side-1">
            { this.props.menuItems.map((item, i) =>{
                return <CreateMenu key = {i} menuType = "singleInSidebar" menuTitle = {item.menuTitle} hrefLink = {item.hrefLink}/>
            }) } 
            </div>    
            <div className="side-2 text-white d-flex align-items-end">
                <div className="w-100 d-flex justify-content-between">
                    <span>{this.props.userProfile.firstName}</span><span onClick = {this.props.userLogout}><i className="fas fa-sign-out-alt"></i> Logout</span>
                </div>
            </div>             
            </div>
        )
    }
}
export default SideBar;