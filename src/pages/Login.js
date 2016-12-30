import React, {Component} from 'react';
import './style/Login.css';
import { browserHistory } from 'react-router';

import firebase from '../api/firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            register: false
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                localStorage.setItem('token', firebase.auth().currentUser.uid);
                browserHistory.push('/');
        
            } else {
                
                // No user is signed in.
                // alert('not authirized')
            }
        });
    }

    handleLoginSubmit(e){
        e.preventDefault();
        const email = this.refs.email.value
      const pass = this.refs.pass.value
        firebase.auth().signInWithEmailAndPassword(email,pass)
        .catch(err=>{
            alert(err.message);
        });
        // localStorage.setItem('token', 233);
        // browserHistory.push('/');
    }

    handleRegisterSubmit(e){
        e.preventDefault();

    }
    
    render() {
        if (this.state.register){
                return (
            <div className="row main">
				<div className="main-login main-center">
					<form onSubmit={this.handleRegisterSubmit}>
						
						<div className="form-group">
							<label htmlFor="name" className="cols-sm-2 control-label">Your Name</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" ref="fullname" className="form-control" name="name" id="name"  placeholder="Enter your Name"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text" ref="email" className="form-control" name="email" id="email"  placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

                        
						<div className="form-group">
							<label htmlFor="phone" className="cols-sm-2 control-label">Phone Number</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="number" ref="phone" className="form-control" name="phone" id="phone"  placeholder="Enter your Username"/>
								</div>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="bitcoinWallet" className="cols-sm-2 control-label">bitcoinWallet</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" ref="bitcoinWallet" className="form-control" name="bitcoinWallet" id="bitcoinWallet"  placeholder="Enter your Name"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="cols-sm-2 control-label">Address</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<textarea ref="address" className="form-control" placeholder="Address">
                                    </textarea>
								</div>
							</div>
                            <div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="text" ref="country" className="form-control" name="country" id="country"  placeholder="Country"/>
								</div>
							</div>
                            <div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="text" ref="postcode" className="form-control" name="postcode" id="postcode"  placeholder="Postcode"/>
								</div>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="sponsorId" className="cols-sm-2 control-label">sponsorId</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="number" ref="sponsorId" className="form-control" name="sponsorId" id="sponsorId"  placeholder="Enter your Name"/>
								</div>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="pass" className="cols-sm-2 control-label">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="password" ref="pass" className="form-control" name="pass" id="pass"  placeholder="Password"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" ref="pass2" className="form-control" name="confirm" id="confirm"  placeholder="Confirm your Password"/>
								</div>
							</div>
						</div>


						<div className="form-group ">
							<button type="button" id="button" className="btn btn-primary btn-lg btn-block login-button">Register</button>
						</div>
						
					</form>
                    // email,pass,fullName,sponsorId,phoneNo,bitcoinWallet,address,postcode,country
				</div>
                <p onClick={()=>this.setState({register: !this.state.register})}>or {!this.state.register ? 'register': 'login'} here</p>
			</div>
        );
        }

        return (
            <div className="row main">
				<div className="main-login main-center">
					<form onSubmit={this.handleLoginSubmit}>
						
						<div className="form-group">
							<label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="email" ref="email" className="form-control" name="email" id="email"  placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="cols-sm-2 control-label">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" ref="pass" className="form-control" name="password" id="password"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div className="form-group ">
							<button type="submit" id="button" className="btn btn-primary btn-lg btn-block login-button">Login</button>
						</div>
						
					</form>
				</div>
                <p onClick={()=>this.setState({register: !this.state.register})}>or {!this.state.register ? 'register': 'login'} here</p>
			</div>
        );
    }
}

export default Login;