import React, {Component} from 'react';
import NavBar from './navBar/navBar';
import './header.css';
import Logo from '../../assets/Mern_1.jpg';

import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {BACKEND_URL} from '../../app.env.const';

class Header extends Component{
    constructor(){
        super();

        this.state = {
            isUserLogged: (localStorage.getItem("usertoken")) ? true : false,
            userProfile: {}
        }
    }
    // opne side nav - mobile version
    openNav = () => {
        (window.innerWidth <= 450)?
        document.getElementById("mySidenav").style.width = "60vw"
            :
        document.getElementById("mySidenav").style.width = "250px";
    }
    // user logout
    userLogout = () => {
        localStorage.removeItem("usertoken");
        localStorage.removeItem("userProfile");
        this.setState({ isUserLogged: false});
    }
    componentDidMount(){
        // show logged user data
        axios.get(`${BACKEND_URL}/user/profile`, { headers: {
            'Authorization': `${localStorage.getItem('usertoken')}`}
            })
            .then(response => {
                this.setState({ userProfile:response.data});
                localStorage.setItem('userProfile', JSON.stringify(this.state.userProfile));
            })
            .catch((err) => {
                console.log(err);
            }); 
    }
    render(){
        return(
            (this.state.isUserLogged) ? <header>
                <div className="header-wrapper">
                    <div className="container header-container">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="logo">
                                <img src={Logo} className="img-fluid" alt="logo" />
                            </div>
                            <span onClick={this.openNav} className="btn-sidebar sidebar-open d-md-none">&#9776; Menu</span>
                        </div>
                    </div>
                    <NavBar userLogout = {this.userLogout} userProfile = {this.state.userProfile}/>
                </div>
            </header> : <Redirect to='/login' />
        )
    }
}
export default Header;