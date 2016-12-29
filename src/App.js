import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import auth from './auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn()
    }
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Confortercoin</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className="active"><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
              {this.state.loggedIn ? (
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Profile <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="/">Muzi</a></li>
                      <li><a href="/logout">Logout</a></li>
                    </ul>
                  </li>
              ) : (
                <li><a href="/login">Login</a></li>
              )}
                
              </ul>
            </div>
          </div>
        </nav>
      <div className="container">
    
        {this.props.children}
      </div>
      </div>
    );
  }
}

export default App;
