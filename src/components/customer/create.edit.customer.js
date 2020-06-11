import React, {Component} from 'react';
import Header from '../../templateParts/header/header';
import Footer from '../../templateParts/footer/footer';
import FormTag from '../../templateParts/formTag/formTag';
import {validation} from '../../templateParts/formTag/validation';
import {filterState} from '../../state/manager.state';
import axios from 'axios';
import {BACKEND_URL, BACK_TO_LIST, FORM_CREATE_BUTTON, FORM_CREATE_BUTTON_DISABLE, FORM_EDIT_BUTTON, FORM_EDIT_BUTTON_DISABLE} from '../../app.env.const';
import {Link} from 'react-router-dom';

class CustomerCreateEdit extends Component{
    constructor(props){
        super(props);

        this.state= {
            customerName: '',
            email: '',
            contactNumber: '',
            streetAddress: '',
            addressUnit: '',
            postalCode: '',
            city: '',
            province: '',
            country:'',
            status:'',
            errors: {},
            server_error: false,
            success: false,
            form: FORM_CREATE_BUTTON,
            loading: false
        }
    }
    
    handleChange = (e) => {
        
        const msgReset = {
            success: false,
            server_error: false,
        }
        if(!!this.state.errors[e.target.name]){

            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ 
                [e.target.name]: e.target.value,
                errors,
                ...msgReset
            });

        }else{

            this.setState({ 
                [e.target.name]: e.target.value,
                ...msgReset
            });

        }
        
    }
    // on submit form
    handleSubmit = (e) => {

        e.preventDefault();

        // Mandatory inputs - filter from state
        const allowStateProperties = ['customerName', 'email', 'contactNumber', 'streetAddress', 'postalCode', 'city', 'province', 'country', 'status'];
        const filteredState = filterState(this.state, allowStateProperties);
        
        // check validation
        const errors = validation(filteredState);

        // check any error presents or not
        const isValid = Object.keys(errors).length === 0;
        this.setState({ 
            errors,
            success: false,
            server_error: false, 
            loading: (isValid)? true : false
        });

        // no error sumbit or update form data
        if(isValid){

            const newCustomer = {
                customerName: this.state.customerName,
                email: this.state.email,
                contactNumber: this.state.contactNumber,
                streetAddress: this.state.streetAddress,
                addressUnit: this.state.addressUnit,
                postalCode: this.state.postalCode,
                city: this.state.city,
                province: this.state.province,
                country: this.state.country,
                status: this.state.status
            }
            if(this.state.form === 'Submit'){
                 // submit section code
                axios.post(`${BACKEND_URL}/customer/add`, newCustomer)
                .then(response => {
                    let msgKey = Object.keys(response.data)[0];
                    this.setState({ 
                        [msgKey] : response.data[msgKey],
                        loading: false
                    });
                    this.resetForm();
                })
                .catch((err) => {
                    console.log(err);
                });
            }else if(this.state.form === 'Save changes'){
                 // update section code
                axios.post(`${BACKEND_URL}/customer/update/${this.state.id}`, newCustomer)
                .then(response => {
                    let msgKey = Object.keys(response.data)[0];
                    this.setState({ 
                        [msgKey] : response.data[msgKey],
                        loading: false
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }

    }
    resetForm = () =>{
        this.setState({
            customerName: '',
            email: '',
            contactNumber: '',
            streetAddress: '',
            addressUnit: '',
            postalCode: '',
            city: '',
            province: '',
            country: '',
            status:'',
        })
    }
    componentDidMount(){

         // select record from DB to update data
         // this request will execute when update form is called
        if(this.props.match.params.id !== undefined){
            axios.get(`${BACKEND_URL}/customer/${this.props.match.params.id}`)
                .then(response =>{
                    this.setState({
                        id: response.data._id,
                        customerName: response.data.customerName,
                        email: response.data.email,
                        contactNumber: response.data.contactNumber,
                        streetAddress: response.data.streetAddress,
                        addressUnit: response.data.addressUnit,
                        postalCode: response.data.postalCode,
                        city: response.data.city,
                        province: response.data.province,
                        country: response.data.country,
                        status: response.data.status,
                        form: FORM_EDIT_BUTTON
                    })                 
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    render(){
        // set diable or enable submit/save changes button when form triggers
        let buttonLabel = null;
        let isDisable = false; 
        if(this.state.loading && this.state.form === 'Submit'){
            buttonLabel = FORM_CREATE_BUTTON_DISABLE;
            isDisable = true;
        }else if(this.state.loading && this.state.form === 'Save changes'){
            buttonLabel = FORM_EDIT_BUTTON_DISABLE;
            isDisable = true;
        }else{
            buttonLabel = this.state.form;
        }
        return(
            <div>
                <Header/>
                <div className="container set-body-height mt-3 mb-3 d-flex justify-content-center">
                    <div className="form-wrapper" style={{width:'45rem'}}>
                        <h1 className="text-center pt-3">Customer</h1>
                        <form onSubmit={this.handleSubmit} method="POST">
                        <div className="text-danger text-right">(*) Required</div>
                        {(this.state.success)&&<div className="alert alert-success mt-2">{this.state.success}</div>}
                        {(this.state.server_error)&&<div className="alert alert-alert mt-2">{this.state.server_error}</div>}
                        <FormTag
                            tag = "input"
                            tagType = "text"
                            tagName = "customerName"
                            tagId = "customerName"
                            tagLabel = "Name"
                            value = {this.state.customerName}
                            onChange = {this.handleChange}
                            isError = { (this.state.customerName === '') ? this.state.errors.customerName : false}
                            isRequired = {true}
                        />
                        <FormTag
                            tag = "input"
                            tagType = "text"
                            tagName = "email"
                            tagId = "email"
                            tagLabel = "Email"
                            value = {this.state.email}
                            onChange={this.handleChange}
                            isError={ (this.state.email === '') ? this.state.errors.email : (this.state.errors.email) ? this.state.errors.email : false}
                            isRequired = {true}
                        />
                        <FormTag
                            tag = "input"
                            tagType = "text"
                            tagName = "contactNumber"
                            tagId = "contactNumber"
                            tagLabel = "Contact Number"
                            value={this.state.contactNumber}
                            onChange={this.handleChange}
                            isError={ (this.state.contactNumber === '') ? this.state.errors.contactNumber : (this.state.errors.contactNumber) ? this.state.errors.contactNumber : false}
                            isRequired = {true}
                        />
                        <FormTag
                            tag = "input"
                            tagType = "text"
                            tagName = "streetAddress"
                            tagId = "streetAddress"
                            tagLabel = "Street Address"
                            value = {this.state.streetAddress} 
                            onChange={this.handleChange}
                            isError={ (this.state.streetAddress === '') ? this.state.errors.streetAddress : false}
                            isRequired = {true}
                        />
                        <FormTag
                            tag = "input"
                            tagType = "text"
                            tagName = "addressUnit"
                            tagId = "addressUnit"
                            tagLabel = "Unit / Suite"
                            value = {this.state.addressUnit}
                            onChange={this.handleChange}
                            isError={ (this.state.addressUnit === '') ? this.state.errors.addressUnit : false}
                        />
                        <FormTag
                            tag = "input"
                            tagType = "text"
                            tagName = "postalCode"
                            tagId = "postalCode"
                            tagLabel = "Postal Code"
                            value = {this.state.postalCode}
                            onChange={this.handleChange}
                            isError={ (this.state.postalCode === '') ? this.state.errors.postalCode : (this.state.errors.postalCode) ? this.state.errors.postalCode : false}
                            isRequired = {true}
                        />
                        <FormTag
                            tag = "dropdown"
                            tagName = "city"
                            tagId = "city"
                            tagLabel = "City"
                            selected = {this.state.city}
                            onChange={this.handleChange}
                            isError={ (this.state.city === '') ? this.state.errors.city : false}
                            isRequired = {true}
                            dropDownOption = {[{
                                optionLabel:'Toronto',
                                optionValue:'Toronto'
                            },
                            {
                                optionLabel:'Ottawa',
                                optionValue:'Ottawa'
                            },
                            {
                                optionLabel:'Oshawa',
                                optionValue:'Oshawa'
                            },
                            {
                                optionLabel:'Hamilton',
                                optionValue:'Hamilton'
                            },
                            {
                                optionLabel:'St. Catharines',
                                optionValue:'St.-Catharines'
                            },
                            {
                                optionLabel:'Kitchener',
                                optionValue:'Kitchener'
                            },
                            {
                                optionLabel:'London',
                                optionValue:'London'
                            },
                            {
                                optionLabel:'Windsor',
                                optionValue:'Windsor'
                            },
                            {
                                optionLabel:'Sudbury',
                                optionValue:'Sudbury'
                            },
                            {
                                optionLabel:'Mississauga',
                                optionValue:'Mississauga'
                            },
                            {
                                optionLabel:'Thunder Bay',
                                optionValue:'Thunder Bay'
                            },
                            {
                                optionLabel:'Brampton',
                                optionValue:'Brampton'
                            }
                            ]}
                        />
                        <FormTag
                            tag = "dropdown"
                            tagName = "province"
                            tagId = "province"
                            tagLabel = "Province"
                            selected = {this.state.province}
                            onChange={this.handleChange}
                            isError={ (this.state.province === '') ? this.state.errors.province : false}
                            isRequired = {true}
                            dropDownOption = {[{
                                optionLabel:'Ontario',
                                optionValue:'Ontario'
                            }
                            ]}
                        />
                        <FormTag
                            tag = "dropdown"
                            tagName = "country"
                            tagId = "country"
                            tagLabel = "Country"
                            selected = {this.state.country}
                            onChange={this.handleChange}
                            isError={ (this.state.country === '') ? this.state.errors.country : false}
                            isRequired = {true}
                            dropDownOption = {[{
                                optionLabel:'Canada',
                                optionValue:'Canada'
                            }
                            ]}
                        />
                        <FormTag
                            tag = "dropdown"
                            tagName = "status"
                            tagId = "status"
                            tagLabel = "Status"
                            selected = {this.state.status}
                            onChange={this.handleChange}
                            isError={ (this.state.status === '') ? this.state.errors.status : false}
                            isRequired = {true}
                            dropDownOption = {[{
                                optionLabel:'Approved',
                                optionValue:true,
                            },
                            {
                                optionLabel:'Denied',
                                optionValue:false
                            }
                            ]}
                        />
                        <div className="col-xs-12 d-flex justify-content-center mt-5 mb-4">
                            <Link to="/customer">
                                <button
                                    type="button"
                                    className="btn btn-secondary mr-2"
                                >{BACK_TO_LIST}</button>
                             </Link>
                            <button 
                                type="submit" 
                                className="btn btn-primary ml-2"
                                disabled={isDisable}
                            >{buttonLabel}</button>       
                        </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default CustomerCreateEdit;