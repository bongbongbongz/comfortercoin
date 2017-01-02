import React, {Component} from 'react';
import auth from '../../auth';
import { browserHistory } from 'react-router';
import firebase from '../../api/firebase';
class Nav extends Component {
      constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn()
    }

  }
  
  changeLogin(){
    this.setState({loggedIn:auth.loggedIn()});
  }

  logout(){
    localStorage.removeItem('token');
    firebase.auth().signOut();
    this.setState({loggedIn:false});
    
    setTimeout(()=>{
        browserHistory.push('/login');
    }, 2000);
    
    
  }
    render() {
        return (
            <div >
                 <nav className="navbar bar navbar-custom navbar-static-top ">
                    <div className="container">
                        <div className="navbar-header">
                        <button type="button" className="navbar-toggle bar collapsed " data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand textcolor" href="/">comfortercoin</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li  className={this.props.active === 'home' ? 'active' : null}><a  href="/">Home</a></li>
                            <li className={this.props.active === 'about' ? 'active' : null}><a href="/about">About</a></li>
                            <li className={this.props.active === 'contact' ? 'active' : null}><a href="/contact">Contact</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                        {this.state.loggedIn ? (
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Profile <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                
                                <li><a onClick={()=>this.logout()}>Logout</a></li>
                                </ul>
                            </li>
                        ) : (
                            <li><a href="/login">Login</a></li>
                        )}
                            
                        </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;