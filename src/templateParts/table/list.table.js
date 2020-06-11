import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser';
import {Link} from 'react-router-dom';
import moment from 'moment';
import './list.table.css'

class List extends Component{
    
    render(){

        //set table header
        var createHeadTr = '';
        let countColumn = 0;
        for (var key in this.props.listLabel) {
            createHeadTr += `<td>${this.props.listLabel[key]}</td>`;
            countColumn++;
        }
        // set href link
        let hrefAddLink = (this.props.listType === "product")? "/product/create" : "/customer/create";
        let hrefEditLink = (this.props.listType === "product")? "/product/edit" : "/customer/edit";
        let createdAddlink = <Link to={hrefAddLink}> <button className="btn btn-primary" >Add</button></Link>;

        // set table body TR
        let bodyDataTr = this.props.listData.map((data)=>{
            
            let createBodyTr = '';
                for (var key in data) {
                    if(key === 'createdDate'){
                        createBodyTr += `<td>${moment(data[key], moment.ISO_8601).format("MM/DD/YYYY")}</td>`;
                    }else if(key !== "_id"){
                        createBodyTr += `<td>${data[key]}</td>`;
                    }
                } 
                return createBodyTr;
        })
        return(
            
            <div className="table-responsive adjust-table">
                
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead>
                        <tr>
                        { ReactHtmlParser(createHeadTr) }
                        <td>{createdAddlink}</td>
                        </tr>
                    </thead>
                    <tbody>
                        { (bodyDataTr.length === 0) ?
                            <tr className="text-center">
                                <td colSpan={countColumn+1}>No data in the list</td>
                            </tr>
                            :
                            bodyDataTr.map((row , i) =>{
                            return(<tr key={i} id={this.props.listData[i]['_id']}>
                            {ReactHtmlParser(row)}
                            <td className="text-center">
                                <div className="d-flex">
                                    <Link to={`${hrefEditLink}/${this.props.listData[i]['_id']}`}>
                                        <button className="btn btn-action mr-2" name="update" id="update">
                                            <i className='fas fa-edit'></i>
                                        </button>
                                    </Link>
                                        <button 
                                            className="btn btn-action ml-2" 
                                            name="delete_user" 
                                            onClick={() => { if(window.confirm("Are you sure you want to delete?")) { return this.props.deleteRecord(this.props.listData[i]['_id']) } }} >
                                            <i className='fas fa-trash'></i>
                                        </button>
                                </div>
                            </td>
                            </tr>)
                        })} 
                    </tbody>
                </table>
            </div>
        )
    }
}
export default List;