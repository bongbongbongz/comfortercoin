import React, {Component} from 'react';
import auth from '../../auth';
import { browserHistory } from 'react-router';
import firebase from '../../api/firebase';
class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
        loggedIn: auth.loggedIn(),
        user: localStorage.user_data ? JSON.parse(localStorage.user_data) : null
        }

  }
  
  changeLogin(){
    this.setState({loggedIn:auth.loggedIn()});
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    firebase.auth().signOut();
    this.setState({loggedIn:false});
    
    setTimeout(()=>{
        browserHistory.push('/login');
    }, 2000);
    
    
  }
    render() {
        return (
            <div >
                  <nav className="navbar navbar-default navbar-fixed">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">COMFORTERCOIN</a>
                        </div>
                        <div className="collapse navbar-collapse">
                         

                            <ul className="nav navbar-nav navbar-right">
                                <li  className={this.props.active === 'home' ? 'active' : null}><a  href="/">HOME</a></li>
                                <li className={this.props.active === 'about' ? 'active' : null}><a href="/about">ABOUT</a></li>
                                <li className={this.props.active === 'faqs' ? 'active' : null}><a href="/faqs">FAQs</a></li>
                                <li className={this.props.active === 'contact' ? 'active' : null}><a href="/contact">CONTACT</a></li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            PROFILE
                                            <b className="caret"></b>
                                    </a>
                                    <ul className="dropdown-menu">
                                   <li>
                                    {this.state.user ? (
                                    <li className="dropdown">
                                        <ul className="dropdown-menu text-a">
                                        
                                        <li><a  href="/profile">{this.state.user.fullName}</a></li>
                                        <li><a  onClick={()=>this.logout()}>{'Logout'}</a></li>
                                        </ul>
                                    </li>
                                ) : (
                                    <li><a href="/login">Login</a></li>
                                )}
                                </li>
                                    </ul>
                                </li>
                              
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;