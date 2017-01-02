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
                     <div className="col-md-12 ">
				<div className="panel">
					<div className="panel-heading panel-color">
						<h3 className="panel-title ">Profile</h3>
						<div className="pull-right">
						</div>
					</div>
					<div className="panel-body">
						<input type="text" className="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
					</div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <tbody>
                               <tr>
                                <td>Full Name</td>
                                <td>{this.state.user.fullName}</td>
                            </tr>
                            <tr>
                                <td>Number</td>
                                <td>{this.state.user.number}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.user.email}</td>
                                
                            </tr>
                             <tr>
                                <td>Bitcoin Wallet</td>
                                <td>{this.state.user.fullName}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{this.state.user.country}</td>
                            </tr>
                            <tr>
                                <td>Postcode</td>
                                <td>{this.state.user.postcode}</td>
                               
                            </tr>
                            
                            </tbody>
                        </table>
				    </div>
				</div>
			</div>
         </section> 
            :
    <div> getting data...</div>} 
  </div> 
  </div>
        );
    }
}

export default Profile;