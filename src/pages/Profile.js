import React, {Component} from 'react';
import Nav from './components/Nav';
import { browserHistory } from 'react-router';
import firebase from '../api/firebase';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            // loggedIn: auth.loggedIn(),
            user: localStorage.user_data ? JSON.parse(localStorage.user_data) : null
        }

        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                this.setState({ready:true});
            } else {
                browserHistory.push('/login');
            }
        });

  }


  
    render() {
        return (
            <div>
                <Nav active="about"/>
                <div className="container">  
                {this.state.ready ? 
                    <section> 
                    <p>  Name: {this.state.user.fullName} </p>
                    <p>  parent: {this.state.user.parent} </p>
                    <p>  postcode: {this.state.user.postcode} </p>
                    <p>  number: {this.state.user.number} </p>
                    <p>  email: {this.state.user.email} </p>
                    <p>  country: {this.state.user.country} </p>
                    </section> 
                            :
                  <div> getting data...</div>} 
                 </div> 
            </div>
        );
    }
}

export default Profile;