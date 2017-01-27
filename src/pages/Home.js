import React, {Component} from 'react';
import Nav from './components/Nav';

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
      level2: false, 
      level3: false, 
      level4: false, 
      level5: false, 
      disableButtons: false, 
      currSponsor: '', 
      terms: false, 
      termsAccepted: false, 
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

    var joinDate = that.state.user_data.createdAt
    , now = Date.now()
    , monSec = 1000 * 60 * 60 * 24 * 30
    , nextMaturity = joinDate + monSec;

    console.log(joinDate)
    console.log(now)
    console.log(monSec)
    console.log(nextMaturity < now)
    console.log(nextMaturity)
    console.log(dateTime.date(joinDate) + " " + dateTime.time(joinDate))
    console.log(dateTime.date(nextMaturity) + " " + dateTime.time(nextMaturity))
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
      return <h3>Getting users for level 1...</h3>
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
    var that = this

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
    return console.log(JSON.parse(localStorage.getItem('user_data')).createdAt)
  }

  render() {
    var user = this.state.user_data

<<<<<<< HEAD
    if (this.state.terms) {
          return(
            <div>
              <Nav active="home" />
              <div className="wrapper">

          <div className="sidebar margin-Top:0%" data-color="yellow" src="img/sidebar-5.jpg">
            <div className="sidebar-wrapper">
                  <div className="logo">
                      <a href="http://www.creative-tim.com" className="simple-text">
                          Creative Tim
                      </a>
                  </div>

                  <ul className="nav">
                      <li className="active">
                          <a href="dashboard.html">
                              <i className="pe-7s-graph"></i>
                              <p>Dashboard</p>
                          </a>
                      </li>
                      <li>
                          <a href="user.html">
                              <i className="pe-7s-user"></i>
                              <p>User Profile</p>
                          </a>
                      </li>
                      <li>
                          <a href="table.html">
                              <i className="pe-7s-note2"></i>
                              <p>Table List</p>
                          </a>
                      </li>
                      <li>
                          <a href="typography.html">
                              <i className="pe-7s-news-paper"></i>
                              <p>Typography</p>
                          </a>
                      </li>
                      <li>
                          <a href="icons.html">
                              <i className="pe-7s-science"></i>
                              <p>Icons</p>
                          </a>
                      </li>
                      <li>
                          <a href="maps.html">
                              <i className="pe-7s-map-marker"></i>
                              <p>Maps</p>
                          </a>
                      </li>
                      <li>
                          <a href="notifications.html">
                              <i className="pe-7s-bell"></i>
                              <p>Notifications</p>
                          </a>
                      </li>
              <li className="active-pro">
                          <a href="upgrade.html">
                              <i className="pe-7s-rocket"></i>
                              <p>Upgrade to PRO</p>
                          </a>
                      </li>
                  </ul>
            </div>
          </div>
          
                 
              </div>
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
=======
    return(
      <div>
        <Nav active="home" />

         <div className="row tabs">
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-yellow">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">26</div>
                                        <div>New Comments!</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-yellow">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">12</div>
                                        <div>New Tasks!</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-yellow">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-shopping-cart fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">124</div>
                                        <div>New Orders!</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-yellow">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-support fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">13</div>
                                        <div>Support Tickets!</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

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
>>>>>>> 05ec58caadd804faae3e24c84fe0b9d629add8ea
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
          <button onClick={() => this.setState({terms: true, })} disabled={!this.state.termsAccepted} >Proceed</button>
        </div>
      )
    }
  }
}

export default Home;

/*

    parent = "1234";
    data = [];
    levelArr = [];
    level = 0;
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            level: 1,
            numLevels: 4,
            levelArr: [],
            data: [],
            parent: "1234"
        }
        this.getChildren(this.data, this.levelArr, firebase.auth().currentUser.uid);
        this.test(firebase.auth().currentUser.uid)
    }

    getChildren(data, levelArr, parent, nodeparent){
        var that = this;
        // //console.log(`https://comforter-co.firebaseio.com/smartMoney/users/${parent}/children.json?orderBy="$key"`);
    fetch(`https://comforter-co.firebaseio.com/smartMoney/users/${parent}/children.json?orderBy="$key"`,
      {
          method: 'GET',
              headers: {
                // 'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
      }).then(resp=>resp.json())
      .then(responseData=>{
        if(nodeparent === firebase.auth().currentUser.uid){
            this.level = 1;
        }
        if( responseData){
          if(this.level <= this.state.numLevels){
            // //console.log(responseData, parent);

            if(!data.hasOwnProperty(parent)){
              ++this.level;
              //console.log("InCREING on "+this.level);
            }else{
            //   //console.log("AVAILABLE:  " + data[parent] + "  LEVEL:  " + this.level);
            }
            // //console.log(data[parent]);
            data[parent] = levelArr[this.level] = Object.assign({}, data[parent], responseData);
            // levelArr[level] = data[parent];
            // //console.log("LEVELLLL "+this.level);
              for(var key in responseData){
                //   //console.log(this.level, key, "YEAHHHHHHHH");
                if (responseData.hasOwnProperty(key)) {
                    that.getDetails(this.level, key);
                    that.getChildren(data, levelArr, key, responseData[key])
                }
              }
              
          }
              
          //console.log(data, levelArr);
        }

      });
  }

    getDetails(level, parent){
    //console.log("LEVELLLL "+level);
    fetch(`https://comforter-co.firebaseio.com/smartMoney/users/${parent}.json`,
      {
          method: 'GET',
              headers: {
                // 'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
      }).then(resp=>resp.json())
      .then(responseData=>{
        let users = this.state.users.slice();
        users[level] = users[level] || [];
        users[level].push({...responseData, id:parent});
        this.setState({users: users});
        // //console.log(users);
      });
  }

    render() {
        return (
            <div>
                <Nav active="home"/>
                  <div className="jumbotron jumbotron">
                      <center>
                       
                       </center>   
                    </div>
                <div className="container">  
                        
                    
                {this.state.users.length > 0 && <a href={"/user/"+firebase.auth().currentUser.uid}>Show Level 1</a>}

                    {this.state.users.map((user, key)=>{
                        return <User key={key} level={key} users={user}/>;
                    })}
   
                </div>
            </div>
        );
    }


*/