import React, {Component} from 'react';
import Header from '../../templateParts/header/header';
import Footer from '../../templateParts/footer/footer';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            userProfile: JSON.parse(localStorage.getItem('userProfile')) || {}
        }
    }
    body = () => {
        return (<div className="container set-body-height mt-3">
            <div className="card mt-3">
            <div className="card-body">
                <h5 className="card-title">{(this.state.userProfile.firstName)&& this.state.userProfile.firstName} {(this.state.userProfile.lastName)&& `${this.state.userProfile.lastName},`} welcome to admin panel</h5>
                {(this.state.userProfile.email)&& <p className="card-text">Email: {this.state.userProfile.email}</p>}
            </div>
            </div>
        </div>)
    }
    
    render(){
        return(
            <div>
                <Header/>
                {this.body()}
                <Footer/>
            </div>
        )
    }
}
export default Home;