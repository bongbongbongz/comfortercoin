import React, {Component} from 'react';
import Nav from './components/Nav';
import { browserHistory } from 'react-router';
import firebase from '../api/firebase';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            edit: false,
            // loggedIn: auth.loggedIn(),
            user: JSON.parse(localStorage.getItem('user_data')), 
            token: localStorage.getItem('token'),
            number: '',
            email: '',
            fullName: '',
        }

        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                this.setState({ready:true});
            } else {
                browserHistory.push('/login');
            }
        });
    }

    updateProfile() {
        var that = this
        
        that.state.user.fullName = that.state.fullName || that.state.user.fullName
        that.state.user.email = that.state.email || that.state.user.email
        that.state.user.number = that.state.number || that.state.user.number

        var updates = {}
        updates['/smartMoney/users/' + that.state.token] = that.state.user

        firebase.database().ref().update(updates)
        .then(() => {
            that.setState({user: that.state.user, edit: false}, () => {
                localStorage.setItem('user_data', JSON.stringify(that.state.user))
            })
        })
        .catch(() => alert('An error occured while updating, please refresh and try again.'))
    }
  
    render() {
        if (this.state.edit) {
            return(
                <div>
                    <p>Full name</p>
                    <input type='text' onChange={(e) => this.setState({fullName: e.target.value})} />
                    <br/>

                    <p>Email</p>
                    <input type='email' onChange={(e) => this.setState({email: e.target.value})} />
                    <br/>

                    <p>Phone number</p>
                    <input type='text' onChange={(e) => this.setState({number: e.target.value})} />
                    <br/>


                    <button onClick={() => this.setState({edit: !this.state.edit})} >Cancel</button>
                    <button onClick={() => this.updateProfile()} >Submit</button>
                </div>
            )
        }
        else {
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
                                
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <tbody>
                                           <tr>
                                            <td>Name & Surname</td>
                                            <td>{this.state.user.fullName}</td>
                                        </tr>
                                        <tr>
                                            <td>Contact number</td>
                                            <td>{this.state.user.number}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{this.state.user.email}</td>
                                            
                                        </tr>
                                         <tr>
                                            <td>Bitcoin Wallet</td>
                                            <td>{this.state.user.bitcoinWallet}</td>
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
}

export default Profile;