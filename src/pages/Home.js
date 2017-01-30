import React, {Component} from 'react';
import Nav from './components/Nav';
import firebase from '../api/firebase';

const dateTime = {
  date: function (date) {
    var d = new Date(date)
    return d.toDateString()
  },
  time: function (time) {
    var d = new Date(time)
    return d.toTimeString().substring(0,8)
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      childrenId: {level1: [], level2: [], level3: [], level4: [], level5: []},
      children: {level1: [], level2: [], level3: [], level4: [], level5: []},
      user_data: JSON.parse(localStorage.getItem('user_data')), 
      token: localStorage.getItem('token'),
      level2: false, 
      level3: false, 
      level4: false, 
      level5: false, 
      disableButtons: false, 
      currSponsor: '', 
      terms: localStorage.getItem('termsAccepted') || null, 
      termsAccepted: false, 
      joinDate: '', 
      maturityDate: '', 
      initialAmount: '',
      currentAmount: '', 
      maturityAmount: '', 
    };
  }

  componentDidMount() {
    var that = this
    
    if (that.state.user_data.children) {
      
      Object.keys(that.state.user_data.children).map( (key) => {
        that.state.childrenId.level1.push(key)
        that.setState({childrenId: that.state.childrenId}, () => {
          localStorage.setItem('childrenId', JSON.stringify(that.state.childrenId))
        })
        return key
      })

      Object.keys(that.state.user_data.children).map( (key) => {
        that.fetchUserData(key, (callback) => {
          that.state.children.level1.push(callback)
          that.setState({children: that.state.children}, () => {
            localStorage.setItem('children', JSON.stringify(that.state.children))
          })
        })
        
        return key
      })
    }
    else {
      return console.log("no children")
    }

    //for some reason the first level needs a bit of time to load
    //this will help in some weird way
    setTimeout(() => {
      this.setState({disableButtons: false})
    }, 1000)

    that.calculateDate()
  }

  fetchChildren(parent, callback) {
    fetch(`https://comforter-co.firebaseio.com/smartMoney/users/${parent}/children.json?orderBy="$key"`,
    {
      method: 'GET',
      headers: {
        // 'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(resp => resp.json())
    .then(responseData => callback(responseData));
  }

  fetchUserData(parent, callback) {
    fetch(`https://comforter-co.firebaseio.com/smartMoney/users/${parent}.json`,
    {
      method: 'GET',
      headers: {
        // 'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(resp => resp.json())
    .then(responseData => callback(responseData));
  }

  getLevel(level, fromLevel) {
    var that = this
    var arrLevel = that.state.childrenId['level' + fromLevel]

    that.setState({['level' + level]: !that.state['level' + level], disableButtons: true}, () => {

      if (that.state.children['level' + level].length > 0) return that.setState({disableButtons: false})

      if (level === 1) {
        return this.setState({level1: !this.state.level1})
      }
      else {
        if (!fromLevel) {
          return null
        }
        else {
          
          for (var i = 0; i < arrLevel.length; i++) {
            that.fetchChildren(arrLevel[i], (id) => {
              if (id) {
                Object.keys(id).map( (key) => {
                  that.state.childrenId['level' + level].push(key)

                  that.fetchUserData(key, (userData) => {
                    if (userData) {
                      that.state.children['level' + level].push(userData)

                      that.setState({
                        childrenId: that.state.childrenId, 
                        children: that.state.children, 
                        ['level' + level]: true, 
                        disableButtons: false, 
                      })
                    }
                  })

                  return key
                })
              }
            })
          }
        }
      }
    })
  }

  level1() {
    var currLevel = 1, nextLevel = 2
    
    if (this.state.children.level1.length > 0) {
      return(
        <div>
         
           <div className="panel panel-default">
            <div className="panel-body panel-color">  Level 1: {this.state.children.level1.length} users </div>
              <div className="table-responsive">
              
              <table className="table table-hover">
                <tbody>
                  <tr>
                      <th>Name & Surname</th>
                      <th>Contact number</th>
                      <th>Email</th>
                      <th>Bitcoin Wallet</th>
                  </tr>
                  
                  {this.users(this.state.children.level1)}
                </tbody>
              </table>
          </div>
        </div>

          <button className="btn btn-warning btn-xs" disabled={this.state.disableButtons} onClick={() => this.getLevel(nextLevel, currLevel)} >View Level {nextLevel}</button>
        </div>
      )
    }
    else {

      if (this.state.user_data.children.length === 0) {
        return <h3>You have not recruited anyone yet.</h3>
      }
      else {
        return <h3>Getting users for level 1...</h3>
      }
    }
  }

  level2() {  
    var currLevel = 2, nextLevel = 3

    if (this.state.level2) {
      if (this.state.children.level2.length > 0) {
        return(
          <div>
             <div className="panel panel-default ">
              <div className="panel-body panel-color">Level 2: {this.state.children.level2.length} users </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <tbody>
                          <tr>
                              <th>Name & Surname</th>
                              <th>Contact number</th>
                              <th>Email</th>
                              <th>Bitcoin Wallet</th>
                          </tr>
                          {this.users(this.state.children.level2)}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>

            <button className="btn btn-warning btn-xs" disabled={this.state.disableButtons} onClick={() => this.getLevel(nextLevel, currLevel)} >View Level {nextLevel}</button>
          </div>
        )
      }
      else {
        return <h3>Getting users for level 2...</h3>
      }
    }
    else {
      return null
    }
  }

  level3() {
    var currLevel = 3, nextLevel = 4

    if (this.state.level3) {
      if (this.state.children.level3.length > 0) {
        return(
          <div>
            <div className="panel panel-default">
              <div className="panel-body panel-color">Level 3: {this.state.children.level3.length} users</div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <tbody>
                      <tr>
                          <th>Name & Surname</th>
                          <th>Contact number</th>
                          <th>Email</th>
                          <th>Bitcoin Wallet</th>
                      </tr>
                      {this.users(this.state.children.level3)}
                    </tbody>
                </table>
            </div>
            </div>
            <br/>

            <button className="btn btn-warning btn-xs" disabled={this.state.disableButtons} onClick={() => this.getLevel(nextLevel, currLevel)} >View Level {nextLevel}</button>
          </div>
        )
      }
      else {
        return <h3>Getting users for level 3...</h3>
      }
    }
    else {
      return null
    }
  }

  level4() {
    var currLevel = 4, nextLevel = 5

    if (this.state.level4) {
      if (this.state.children.level4.length > 0) {
        return(
          <div>
            <div className="panel panel-default">
              <div className="panel-body panel-color">Level 4: {this.state.children.level4.length} users</div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <tbody>
                      <tr>
                          <th>Name & Surname</th>
                          <th>Contact number</th>
                          <th>Email</th>
                          <th>Bitcoin Wallet</th>
                      </tr>
                      {this.users(this.state.children.level4)}
                    </tbody>
                </table>
            </div>
            </div>
            <br/>

            <button className="btn btn-warning btn-xs" disabled={this.state.disableButtons} onClick={() => this.getLevel(nextLevel, currLevel)} >View Level {nextLevel}</button>
          </div>
        )
      }
      else {
        return <h3>Getting users for level 4...</h3>
      }
    }
    else {
      return null
    }
  }

  level5() {
    var currLevel = 5, nextLevel = null

    if (this.state.level5) {
      if (this.state.children.level5.length > 0) {
        return(
          <div>
            <div className="panel panel-default">
              <div className="panel-body panel-color">Level 5: {this.state.children.level5.length} users</div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <tbody>
                      <tr>
                          <th>Name & Surname</th>
                          <th>Contact number</th>
                          <th>Email</th>
                          <th>Bitcoin Wallet</th>
                      </tr>
                      {this.users(this.state.children.level5)}
                    </tbody>
                </table>
            </div>
            </div>
            <br/>
          </div>
        )
      }
      else {
        return <h3>Getting users for level 5...</h3>
      }
    }
    else {
      return null
    }
  }

  users(users) {
    return users.map( (user) => {
      return(
        <tr key={user.number} >
            <td>{user.fullName}</td>
            <td>{user.number}</td>
            <td>{user.email}</td>
            <td>{user.bitcoinWallet}</td>
            <td>
              <button type="button" 
                className="btn btn-warning btn-xs" 
                data-toggle="modal" 
                data-target=".bs-example-modal-lg" 
                onClick={() => this.getSponsor(user.parent)} >View Sponsor</button>
            </td>
        </tr>  
      )
    })
  }

  getSponsor(parent) {
    var that = this

    that.setState({currSponsor: ''}, () => {
      that.fetchUserData(parent, (callback) => {
        return that.setState({currSponsor: callback})
      })
    })
  }

  showSponsor() {
    if (this.state.currSponsor) {
      return(
        <div className="modal in modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
               <div className="modal-header">
                <center><h4 className="modal-title">Sponsor Details</h4></center>
              </div>
               <div className="modal-body">
                  <div className="list-group">
                  <a href="#" className="list-group-item">Name :{this.state.currSponsor.fullName}</a>
                  <a href="#" className="list-group-item">Contact Number :{this.state.currSponsor.number}</a>
                  <a href="#" className="list-group-item">Email Address :{this.state.currSponsor.email}</a>
                </div>
               </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
          </div>
        </div>


      )
    }
    else {
      return(
        <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <h3>Loading data...</h3>
            </div>
          </div>
        </div>
      )
    }
  }

  calculateDate() {
    var that = this
    var percentage = 50

    var maturityDate = that.state.user_data.maturityDate
      , nextMaturity = that.state.user_data.maturityDate
      , currentAmount = that.state.user_data.currentAmount
      , now = Date.now()
      , monSec = 60000 * 60 * 24 * 30
      , percentageIncrease = (percentage + 100)/100;

    function calculateMaturityDate(now, nextMaturity, done) {
      if (now >= nextMaturity) {
        nextMaturity += monSec
        return calculateMaturityDate(now, nextMaturity, done)
      }
      else {

        if (nextMaturity === maturityDate) {
          return done(maturityDate)
        }
        else {
          //here we update current amount and maturity date in database
          that.state.user_data.currentAmount = currentAmount * percentageIncrease
          that.state.user_data.maturityDate = nextMaturity

          var updates = {}
          updates['/smartMoney/users/' + that.state.token] = that.state.user_data

          firebase.database().ref().update(updates)
          .then(function () {
            return done(nextMaturity)
          })
          .catch(function () {
            alert('An error occured while updating your current amount and maturity date, please refresh and try again.')
            return done(false)
          })
        }
      }
    }

    calculateMaturityDate(now, nextMaturity, function (done) {
      if (done === false) return 
      
      that.state.user_data.maturityDate = done

      return that.setState({user_data: that.state.user_data}, () => {
        localStorage.setItem('user_data', JSON.stringify(that.state.user_data))
      })
    })
  }

 render() {
    var user = this.state.user_data

    if (this.state.terms) {
      return(
        <div>
          <Nav active="home" />

 <section class="content">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon bg-purple"><i className="material-icons">date_range</i></span>

            <div className="info-box-content">
              <span className="info-box-text">Joining date:</span>
              <span className="info-box-number">{dateTime.date(this.state.user_data.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon bg-purple"><i className="material-icons">date_range</i></span>

            <div className="info-box-content">
              <span className="info-box-text">Maturity date:</span>
              <span className="info-box-number">{dateTime.date(this.state.user_data.maturityDate)}</span>
            </div>
          </div>
        </div>
      
        <div className="clearfix visible-sm-block"></div>

        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon bg-purple"><i className="material-icons">monetization_on</i></span>

            <div className="info-box-content">
              <span className="info-box-text">Initial amount: {this.state.user_data.initialAmount}</span>
              <span className="info-box-number">R {this.state.user_data.currentAmount}</span>
              <span className="info-box-number"></span>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon bg-purple"><i className="material-icons">monetization_on</i></span>

            <div className="info-box-content">
              <span className="info-box-text">Amount to be earned on maturity date:</span>
              <span className="info-box-number">R {this.state.user_data.currentAmount * 0.5}</span>
            </div>
          </div>
        </div>
      </div>
      </section>
    
        <div className="content">
            <div className="container-fluid" style={{marginBottom: 150}} >
              <div className="row">
                <div style={{
                    margin: 25, 
                    borderWidth: 1, 
                    borderColor: '#000000', 
                  }} >
                  
                  <div>
                    {this.showSponsor()}
                    {this.level1()}
                    {this.level2()}
                    {this.level3()}
                    {this.level4()}
                    {this.level5()}
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div> 
      )
    }
    else {
      return(
        <div>
          <p>Terms and conditions</p>
          
          <div>
            <input type='checkbox' onChange={() => this.setState({termsAccepted: !this.state.termsAccepted})} />
            <span>Yes I accept the terms</span> 
          </div>
          
          <button>Cancel</button>
          <button onClick={() => this.setState({terms: true, }, () => localStorage.setItem('termsAccepted', true))} disabled={!this.state.termsAccepted} >Proceed</button>
        </div>
      )
    }
  }
}

export default Home;
