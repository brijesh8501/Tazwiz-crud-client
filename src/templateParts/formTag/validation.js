export const validation = (data) =>{

    let regexPostalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    let regexContactNumber = /(\(\d{3}\)[.-]|(\d{3}[.-])){2}\d{4}/;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    let errors = {};
    for (var key in data) {

        if(key === "email" || key === "contactNumber" || key === "postalCode"){
            if(data[key] === "") {
                errors[key] = "Required";
            }else if(key === "email" && data[key] && !regexEmail.test(data[key])){
                errors[key] = "Invalid email address";
            }else if(key === "contactNumber" && data[key] && !regexContactNumber.test(data[key])){
                errors[key] = "Invalid format e.g (999)-999-9999"
            }else if(key === "postalCode" && data[key] && !regexPostalCode.test(data[key])){
                errors[key] = "Invalid format e.g A1A 1A1 or A1A1A1"
            }
        }else if(key === "createdDate" && data[key] === null){
            errors[key] = "Required";
        }else{
            if(data[key] === "") errors[key] = "Required";
        } 
       
    }

    return errors;

}