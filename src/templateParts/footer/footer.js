import React, {Component} from 'react';
import './footer.css';

class Footer extends Component{
    render(){
        return(
            <footer>
                <div className="container h-100">
                    <div className="row h-100 d-flex align-items-center justify-content-center p-3">
                        <span>
                            Tazwiz Inc.&copy; Brijesh Ahir's task
                        </span>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;