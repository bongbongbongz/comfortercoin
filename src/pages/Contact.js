import React, {Component} from 'react';
import Nav from './components/Nav';

class Contact extends Component {
    
    render() {
        return (
            <div>
                <Nav active="about"/>
                <div className="container text-center color-white">
                <div className="row">
                    <h2 className="color: rgb(24, 157, 14);"><i aria-hidden="true" className="fa fa-whatsapp"></i> Contact Us</h2>
                    <h4 className="font-size: 14px; line-height: 22px;">email : comfortercoins@gmail.com</h4>
                </div>
            </div>
            
               </div>
          
        );
    }
}

export default Contact;