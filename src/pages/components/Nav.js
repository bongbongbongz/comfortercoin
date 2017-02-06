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
            
                  <header className="header">
                    <div role="navigation" className="navbar navbar-purple  navbar-static-top" role="navigation">
                        <div className="container">
                              <div className="logo-wrapper">
                                    <a className="navbar-brand">
                                    <img alt="comfortercoin"/>
                                </a>  
                            </div>  
                            
                      
                        <div id="navigation" className="collapse navbar-collapse navbar-right">
                            <ul className="nav navbar-nav">
                             <li  className={this.props.active === 'home' ? 'active' : null}><a  href="/">Home</a></li>
                             <li className={this.props.active === 'about' ? 'active' : null}><a href="/about">About</a></li>
                             <li className={this.props.active === 'faqs' ? 'active' : null}><a href="/faqs">FAQs</a></li>
                             <li className={this.props.active === 'contact' ? 'active' : null}><a href="/contact">Contact</a></li>
                             <li className="dropdown"><a href="#" data-toggle="dropdown" className="dropdown-toggle">Profile <b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                      <li><a  href="/profile">{this.state.user.fullName}</a></li>
                                      <li><a  onClick={()=>this.logout()}>{'Logout'}</a></li>
                               </ul>
                            </li>
                             ) : (
                            )}
                            </ul>
                        </div>
                        </div>
                    </div>
                    </header>
            </div>
        );
    }
}

export default Nav;