import React, {Component} from 'react';
import Header from '../../templateParts/header/header';
import Footer from '../../templateParts/footer/footer';
import FormTag from '../../templateParts/formTag/formTag';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {validation} from '../../templateParts/formTag/validation';
import {filterState} from '../../state/manager.state';
import axios from 'axios';
import {BACKEND_URL, BACK_TO_LIST, FORM_CREATE_BUTTON, FORM_CREATE_BUTTON_DISABLE, FORM_EDIT_BUTTON, FORM_EDIT_BUTTON_DISABLE} from '../../app.env.const';
import {Link} from 'react-router-dom';

class ProductCreateEdit extends Component{
     
    constructor(props){
        super(props);

        this.state= {
            id: '',
            productName: '',
            price: '',
            description: '',
            createdDate: new Date(),
            errors: {},
            server_error: false,
            success: false,
            form: FORM_CREATE_BUTTON,
            loading: false
        }
    }
    // on change - HTML tags
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
   // on change - for date tag
    handleDateChange = (date) => {

        if(!!this.state.errors['createdDate']){

            let errors = Object.assign({}, this.state.errors);
            delete errors['createdDate'];
            this.setState({ 
                createdDate: date,
                errors
            });

        }else{

            this.setState({ createdDate: date });

        }

        
    }
     // on submit form
    handleSubmit = (e) => {

        e.preventDefault();
        // Mandatory inputs - filter from state
        const allowStateProperties = ['productName', 'price', 'description', 'createdDate'];
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

            const newProduct = {
                productName: this.state.productName,
                price: Number(this.state.price),
                description: this.state.description,
                createdDate: this.state.createdDate,
            }
            if(this.state.form === 'Submit'){
                // submit section code
                axios.post(`${BACKEND_URL}/product/add`, newProduct)
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
                axios.post(`${BACKEND_URL}/product/update/${this.state.id}`, newProduct)
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
            productName: '',
            price: '',
            description: '',
            createdDate: new Date(),
        })
    }
    componentDidMount(){
        // select record from DB to update data
         // this request will execute when update form is called
        if(this.props.match.params.id !== undefined){
            axios.get(`${BACKEND_URL}/product/${this.props.match.params.id}`)
                .then(response =>{
                    this.setState({
                        id: response.data._id,
                        productName: response.data.productName,
                        price: response.data.price,
                        description: response.data.description,
                        createdDate: response.data.createdDate,
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
                <div className="container set-body-height mt-3 mb-3 d-flex justify-content-center align-items-center">
                    <div className="form-wrapper" style={{width:'45rem'}}>
                        <h1 className="text-center pt-3">Product</h1>
                        <form onSubmit={this.handleSubmit} method="POST">
                        <div className="text-danger text-right">(*) Required</div>
                        {(this.state.success)&&<div className="alert alert-success mt-2">{this.state.success}</div>}
                        {(this.state.server_error)&&<div className="alert alert-alert mt-2">{this.state.server_error}</div>}
                        <FormTag
                            tag = "input"
                            tagType = "text"
                            tagName = "productName"
                            tagId = "productName"
                            tagLabel = "Name"
                            value = {this.state.productName}
                            onChange = {this.handleChange}
                            isError={ (this.state.productName === '') ? this.state.errors.productName : false}
                            isRequired = {true}
                        />
                        <FormTag
                            tag = "input"
                            tagType = "number"
                            tagName = "price"
                            tagId = "price"
                            tagLabel = "Price"
                            value = {this.state.price}
                            onChange = {this.handleChange}
                            isError={ (this.state.price === '') ? this.state.errors.price : false}
                            isRequired = {true}
                        />
                        <FormTag
                            tag = "textarea"
                            tagType = "textarea"
                            tagName = "description"
                            tagId = "description"
                            tagLabel = "Description"
                            value = {this.state.description}
                            onChange = {this.handleChange}
                            isError={ (this.state.description === '') ? this.state.errors.description : false}
                            isRequired = {true}
                        />
                        <div className="form-group">
                            <label htmlFor="createdDate" className={ (this.state.createdDate === null && this.state.errors.createdDate)? "text-danger" : ""}>Date of Creation</label>
                            <span className="text-danger">&nbsp;*</span>
                            <div>
                                <DatePicker 
                                    name = "createdDate"
                                    id = "createdDate"
                                    value = {new Date(this.state.createdDate)}
                                    onChange = {this.handleDateChange}
                                    selected = {new Date(this.state.createdDate)}
                                    className={ (this.state.createdDate === null && this.state.errors.createdDate)? "manual-form-control is-invalid" : "manual-form-control"}
                                />
                            </div>
                            { (this.state.createdDate === null && this.state.errors.createdDate)? <span className = "text-danger">Required</span> : ""}
                        </div> 
                        <div className="col-xs-12 d-flex justify-content-center mt-5 mb-4">
                            <Link to="/product">
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
export default ProductCreateEdit;