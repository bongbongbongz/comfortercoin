import React, {Component} from 'react';
import './style/Login.css';
import { browserHistory } from 'react-router';

import firebase from '../api/firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            register: false,
            ready: false,
			busy: false
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);

        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                // User is signed in.
                localStorage.setItem('token', firebase.auth().currentUser.uid);
                browserHistory.push('/');
        
            } else {
                this.setState({ready:true})
                // No user is signed in.
                // alert('not authirized')
            }
        });
    }
	first(obj) {
    	for (var a in obj) return a;
	}
    
    handleLoginSubmit(e){
        e.preventDefault();
		this.setState({busy:true});
        const email = this.refs.email.value
        const pass = this.refs.pass.value
        firebase.auth().signInWithEmailAndPassword(email,pass)
        .catch(err=>{
			this.setState({busy:false});
            alert(err.message);
        });
        // localStorage.setItem('token', 233);
        // browserHistory.push('/');
    }

	checkPhoneNumber(num, cb){
		var database = firebase.database();
		var that = this;
		database.ref('smartMoney/users/').orderByChild("number").equalTo(num).once("value", function(snap) {

		if(snap.exists()){
			alert(`Number ${num} Belongs to another user`);
			that.setState({busy:false});
			return;
		}
		cb();
			});
	}

    handleRegisterSubmit(e){
		this.setState({busy:true});
		var that = this;
        e.preventDefault();
        const email = this.refs.email.value
        const pass = this.refs.pass.value
        const phoneNo = +this.refs.phone.value
        const bitcoinWallet = this.refs.bitcoinWallet.value
        const sponsorId = +this.refs.sponsorId.value
        const address = this.refs.address.value
        const postcode = this.refs.postcode.value
        const country = this.refs.country.value
        const fullName = this.refs.fullname.value

        var database = firebase.database();
		//checks if sponsor exists
        database.ref('smartMoney/users/').orderByChild("number").equalTo(sponsorId).once("value", function(snap) {

			if(!snap.exists()){
				alert(`sponsor ${sponsorId} does not exist`);
				that.setState({busy:false});
				return;
			}
			var parent = that.first(snap.val());
			if(!parent){
				alert('check sponsor ID');
				return;
			}
			//checks if phone number is in use
			that.checkPhoneNumber(phoneNo, ()=>{
				firebase.auth().createUserWithEmailAndPassword(email,pass).then(snapshot =>{
					firebase.database().ref(`/smartMoney/users/${snapshot.uid}/`)
						.set({email:snapshot.email,fullName, parent:sponsorId,number:phoneNo,bitcoinWallet:bitcoinWallet,
							address:address,postcode:postcode,country:country}).then(success=>{
							firebase.database().ref(`/smartMoney/users/${parent}/children/${snapshot.uid}`).set(true);
							//  console.log(success);
							that.setState({busy:false});
					}).catch(e => alert(e.message));

				}).catch(err=>{
					alert(err.message);
				});
			});
        });
    }
    
    render() {
        if(!this.state.ready){
            return             (<div className="row main">
				<div className="main-login main-center">
                <h1>Loading...</h1>
            </div>
            </div>
            );
        }
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
									<input type="text" ref="fullname" required className="form-control" name="name" id="name"  placeholder="Enter your Name"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text" ref="email" required className="form-control" name="email" id="email"  placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

                        
						<div className="form-group">
							<label htmlFor="phone" className="cols-sm-2 control-label">Phone Number</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="number" ref="phone" required className="form-control" name="phone" id="phone"  placeholder="Enter Phone Number"/>
								</div>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="bitcoinWallet" className="cols-sm-2 control-label">bitcoinWallet</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" ref="bitcoinWallet" required className="form-control" name="bitcoinWallet" id="bitcoinWallet"  placeholder="Enter bitcoinWallet"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="cols-sm-2 control-label">Address</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<textarea ref="address" required className="form-control" placeholder="Address">
                                    </textarea>
								</div>
							</div>
                            <div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="text" ref="country" required className="form-control" name="country" id="country"  placeholder="Country"/>
								</div>
							</div>
                            <div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="text" required ref="postcode" className="form-control" name="postcode" id="postcode"  placeholder="Postcode"/>
								</div>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="sponsorId" className="cols-sm-2 control-label">sponsorId</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="number" required ref="sponsorId" className="form-control" name="sponsorId" id="sponsorId"  placeholder="Enter sponsorId"/>
								</div>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="pass" className="cols-sm-2 control-label">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="password" required ref="pass" className="form-control" name="pass" id="pass"  placeholder="Password"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" required ref="pass2" className="form-control" name="confirm" id="confirm"  placeholder="Confirm your Password"/>
								</div>
							</div>
						</div>


						<div className="form-group ">
							{this.state.busy ? <button type="button" id="button" className="btn btn-primary btn-lg btn-block login-button"> REGISTERING ... </button>: <button type="submit" id="button" className="btn btn-primary btn-lg btn-block login-button">Register</button>}
						</div>
						<center> <p onClick={()=>this.setState({register: !this.state.register})}>or {!this.state.register ? 'register': 'login'} here</p></center>
					</form>
                   
				</div>

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
									 <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
									<input type="email" required ref="email" className="form-control" name="email" id="email"  placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="cols-sm-2 control-label">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
									<input type="password" required ref="pass" className="form-control" name="password" id="password"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div className="form-group ">
							{this.state.busy ? <button type="button" id="button" className="btn btn-primary btn-lg btn-block login-button"> LOGGING IN ... </button>: <button type="submit" id="button" className="btn btn-primary btn-lg btn-block login-button">Login</button>}
						</div>

						<center> <p onClick={()=>this.setState({register: !this.state.register})}>or {!this.state.register ? 'register': 'login'} here</p></center>
					</form>
				</div>
			</div>
			
        );
    }
}

export default Login;