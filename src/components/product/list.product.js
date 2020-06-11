import React, {Component} from 'react';
import Header from '../../templateParts/header/header';
import Footer from '../../templateParts/footer/footer';
import List from '../../templateParts/table/list.table';
import axios from 'axios';
import {BACKEND_URL} from '../../app.env.const';

class ProductList extends Component{
    constructor(props){
        super(props);
        this.state = {listData: []};
    }
    //delete record from the table
    deleteRecord = (id) => {
        axios.delete(`${BACKEND_URL}/product/delete/${id}`)
        .then(response => {
            let msgKey = Object.keys(response.data)[0];
            this.state.listData.splice(this.state.listData.findIndex(item => item._id === id), 1)
            this.setState({ listData: this.state.listData });
            alert(response.data[msgKey]);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    componentDidMount(){
        // show data in the table
        axios.get(`${BACKEND_URL}/product`)
            .then(response => {
                this.setState({listData: response.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render(){
        // table head section 
        const createList = {
                productName: 'Product Name',
                price: 'Price',
                description: 'Description',
                createdDate: 'Created Date',
        }
        return(
            <div>
                <Header/>
                <div className="container set-body-height mt-3 mb-5">
                    <h1 className="text-center pt-3">Product</h1>
                    <div className="adjust-table mt-5">
                       <List listLabel = {createList} listType = "product" listData = {this.state.listData} deleteRecord = {this.deleteRecord}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default ProductList;