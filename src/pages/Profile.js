import React, {Component} from 'react';
import Nav from './components/Nav';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        // loggedIn: auth.loggedIn(),
        user: JSON.parse(localStorage.user_data)
        }

  }
  
    render() {
        return (
            <div>
                <Nav active="about"/>
                <div className="container">   
                  <p>  Name: {this.state.user.fullName} </p>
                  <p>  parent: {this.state.user.parent} </p>
                  <p>  postcode: {this.state.user.postcode} </p>
                  <p>  number: {this.state.user.number} </p>
                  <p>  email: {this.state.user.email} </p>
                  <p>  country: {this.state.user.country} </p>
                 </div> 
            </div>
        );
    }
}

export default Profile;