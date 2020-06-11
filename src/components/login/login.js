import React, {Component} from 'react';
import axios from 'axios';
import './login.css';
import {BACKEND_URL} from '../../app.env.const';
import {filterState} from '../../state/manager.state';
import {validation} from '../../templateParts/formTag/validation';
import ReactHtmlParser from 'react-html-parser';


class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            errors: {},
            server_error: '',
            token: ''
        }

    }
    // on change - HTML tags
    handleChange = (e) => {
        if(!!this.state.errors[e.target.name]){

            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ 
                [e.target.name]: e.target.value,
                errors,
            });

        }else{

            this.setState({ 
                [e.target.name]: e.target.value,
            });

        }
    }
    // on submit form
    handleSubmit = (e) => {
        e.preventDefault();

        const allowStateProperties = ['email', 'password'];
        const filteredState = filterState(this.state, allowStateProperties);
        
        const errors = validation(filteredState);
        const isValid = Object.keys(errors).length === 0;
        this.setState({ errors});
        if(isValid){

            axios.post(`${BACKEND_URL}/user/login`, {
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                if(res.data){
                    let msgKey = Object.keys(res.data)[0];
                    
                    this.setState({ 
                        server_error: '',
                        token: '',
                        [msgKey] : res.data[msgKey]
                    });
                    if(!res.data['server_error']){
                        localStorage.setItem('usertoken', res.data.token);
                        this.props.history.push('/');
                    }

                }
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            this.setState({ 
                server_error: '',
                token: '',
            });
        }
    } 
    body = () => {

        // display errors
        if(Object.keys(this.state.errors).length !== 0){       
            var i = 1
            let errorDisplay = '';
            for (var key in this.state.errors){
                if(i === 1){
                    errorDisplay += `${i}. ${(this.state.errors[key] === 'Required') ? `${key.charAt(0).toUpperCase() + key.slice(1)} is ${this.state.errors[key].charAt(0).toLowerCase() + this.state.errors[key].slice(1)}`: this.state.errors[key]} `;
                }else{
                    errorDisplay += `<br>${i}. ${(this.state.errors[key] === 'Required') ? `${key.charAt(0).toUpperCase() + key.slice(1)} is ${this.state.errors[key].charAt(0).toLowerCase() + this.state.errors[key].slice(1)}`: this.state.errors[key]} `;
                }
                i++;
            }
        var divError  = <div className="alert alert-danger alt-dngr">{ReactHtmlParser(errorDisplay)}</div>;
        }
        return (
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign In</h5>
                  
                  <form onSubmit={this.handleSubmit} className="form-signin" id="form-signin" method="post">
                    {divError}
                    {(this.state.server_error)&&<div className="alert alert-danger alt-dngr">{this.state.server_error}</div>}
                    <div className="form-label-group">
                      <input type="text" id="email" name="email" className="form-control" placeholder="Email address" value = {this.state.email} onChange = {this.handleChange} autoFocus />
                      <label htmlFor="email">Email address</label>
                    </div>
      
                    <div className="form-label-group">
                      <input type="password" id="password" name="password" className="form-control" value = {this.state.password} onChange = {this.handleChange} placeholder="Password" />
                      <label htmlFor="password">Password</label>
                    </div>
    
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" name="sign-in" id="sign-in">Sign in</button>
                  </form>

                </div>

              </div>
            </div>
          </div>
        )
    }
    componentDidMount(){
        
        if(localStorage.getItem("usertoken")){
            this.props.history.push('/')
        }
        
    }
    render(){
        return(<div>
            <div className="container d-flex flex-column justify-content-center" id="login"> 
                {this.body()}
            </div>
            </div>
        )
    }
}
export default Login;