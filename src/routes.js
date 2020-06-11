import React, {Component} from 'react';
import Home from './components/home/home';
import CustomerList from './components/customer/list.customer';
import CustomerCreateEdit from './components/customer/create.edit.customer'; 
import ProductList from './components/product/list.product'; 
import ProductCreateEdit from './components/product/create.edit.product'; 
import Login from './components/login/login';

import {Route, Switch } from 'react-router-dom';

class Routes extends Component{
    render(){
        return (
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/customer" exact component={CustomerList}/>
                    <Route path="/customer/create" component={CustomerCreateEdit}/>
                    <Route path="/customer/edit/:id" component={CustomerCreateEdit}/>
                    <Route path="/product" exact component={ProductList}/>
                    <Route path="/product/create" component={ProductCreateEdit}/>
                    <Route path="/product/edit/:id" component={ProductCreateEdit}/>
                </Switch>
        )
    }
}
export default Routes;