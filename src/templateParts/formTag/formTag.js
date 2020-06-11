import React, {Component} from 'react';

class FormTag extends Component{

    handleChange = (event) => {

        this.props.onChange(event);
    }
    render(){
        
        let tag = null;
        switch(this.props.tag)
        {
            case('input') :
                tag = (
                    <div className="form-group">
                        <label htmlFor={this.props.tagName} className={this.props.isError ? "text-danger":""}>{this.props.tagLabel}</label>
                        { (this.props.isRequired)&& <span className="text-danger">&nbsp;*</span> }
                        <input 
                            type = {this.props.tagType} 
                            className = {this.props.isError ? "form-control is-invalid" : "form-control"} 
                            name = {this.props.tagName} 
                            id = {this.props.tagId}
                            value = {this.props.value}
                            onChange = {this.handleChange}
                            aria-label = {this.props.tagLabel}
                        />
                        { this.props.isError ? (<span className= "text-danger">{this.props.isError}</span>) : "" }
                    </div>
                );
                break;
            case('dropdown') :
                tag = (
                    <div className="form-group">
                        <label htmlFor={this.props.tagName} className={this.props.isError ? "text-danger":""}>{this.props.tagLabel}</label>
                        { (this.props.isRequired)&& <span className="text-danger">&nbsp;*</span> }
                        <select 
                            className = {this.props.isError ? "form-control is-invalid" : "form-control"}  
                            id = {this.props.tagId} 
                            name = {this.props.tagName}  
                            value = {this.props.selected}
                            onChange = {this.handleChange}
                        >
                            <option value="" aria-label="select">--select--</option>
                            { this.props.dropDownOption.map( (item, i) =>
                            {
                                return (<option value={item.optionValue} key={i} aria-label={item.optionLabel}>{item.optionLabel}</option>)
                            }) }
                        </select>
                        { this.props.isError ? (<span className= "text-danger">{this.props.isError}</span>) : "" }
                    </div>
                );
                break;
            case('textarea') :
            tag = (
                <div className="form-group">
                <label htmlFor={this.props.tagName} className={this.props.isError ? "text-danger":""}>{this.props.tagLabel}</label>
                { (this.props.isRequired)&& <span className="text-danger">&nbsp;*</span> }
                <textarea 
                    className = {this.props.isError ? "form-control is-invalid" : "form-control"} 
                    id = {this.props.tagName} 
                    name = {this.props.tagName}
                    onChange = {this.handleChange}
                    rows = "3"
                    value = {this.props.value}
                    maxLength = "100"
                ></textarea>
                { this.props.isError ? (<span className = "text-danger">{this.props.isError}</span>) : "" }
              </div>
            )
            break;
            default :
                tag = null;
        }
    return tag;
    }
}
export default FormTag;