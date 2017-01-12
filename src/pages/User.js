import React, {Component} from 'react';
import Nav from './components/Nav';
import { browserHistory } from 'react-router';
import firebase from '../api/firebase';
import User from './components/User';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            // loggedIn: auth.loggedIn(),
            numChildren: 0,
            children: [],
            user:  null
        }

        // firebase.auth().onAuthStateChanged((user)=> {
        //     if (user) {
        //         this.setState({ready:true});
        //     } else {
        //         browserHistory.push('/login');
        //     }
        // });

  }

  getChildren(){
      var that = this;
      console.log(this.props.params.uid);
      var database = firebase.database();
        database.ref(`smartMoney/users/${this.props.params.uid}`).once("value", function(snap) {
            console.log(snap.val());
            let children = snap.val().children;
            that.setState({ready:true, user: snap.val(), numChildren: Object.keys(children).length})
            for (var key in children) {
                if (children.hasOwnProperty(key)) {
                    database.ref(`smartMoney/users/${key}`).once("value", function(childSnap) {
                        console.log(childSnap.val());
                        that.setState({children: [...that.state.children, childSnap.val()]})
                    });
                }
            }
        });
  }

  componentDidMount() {
      this.getChildren();
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
                                <td>{this.state.user.fullName}</td>
                            </tr>     
                             <tr>
                                <td>Sponsor Id</td>
                                <td>{this.state.user.parent}</td>
                            </tr>                      
                            </tbody>
                        </table>
				    </div>
				</div>
			</div>
            <h3>{this.state.numChildren} people under you</h3>
            <User level="0" users={this.state.children} />
         </section> 
            :
    <div> getting data...</div>} 
  </div> 
  </div>
        );
    }
}

export default Profile;