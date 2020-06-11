import React, {Component} from 'react';
import Header from '../../templateParts/header/header';
import Footer from '../../templateParts/footer/footer';
import List from '../../templateParts/table/list.table';
import axios from 'axios';
import {BACKEND_URL} from '../../app.env.const';

class CustomerList extends Component{

    constructor(props){
        super(props);
        this.state = {
            listData: [],
        };
    }
    //delete record from the table
    deleteRecord = (id) => {
        axios.delete(`${BACKEND_URL}/customer/delete/${id}`)
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
        axios.get(`${BACKEND_URL}/customer`)
            .then(response => {
                
                let alteredResponse = response.data.map((data) => {
                    let listData = {};
                    listData._id = data._id;
                    listData.customerName = data.customerName;
                    listData.email = data.email;
                    listData.contactNumber = data.contactNumber;
                    listData.address = `${(data.addressUnit)&& `${data.addressUnit}-`}${data.streetAddress}, ${data.city}, ${data.province}, ${data.country} - ${data.postalCode}`;
                    listData.status = (data.status)? `<span class="badge badge-success p-2">Approved</span>` : `<span class="badge badge-danger p-2">Denied</span>`;
                    return listData;
                })
              
                this.setState({listData: alteredResponse});
            })
            .catch((err) => {
                console.log(err);
            }); 
    }
    render(){
        // table head section 
        const createList = {
            customerName: 'Name',
            email: 'Email',
            contactNumber: 'Contact Number',
            address: 'Address',
            status: 'Status'
        }
        return(
            <div>
                <Header/>
                <div className="container set-body-height mt-3 mb-5">
                    <h1 className="text-center">Customer</h1>
                       <List listLabel = {createList} listType = "customer" listData = {this.state.listData} deleteRecord = {this.deleteRecord}/>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default CustomerList;