import React, {Component} from 'react';
import Nav from './components/Nav';

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

          <button className="btn btn-warning btn-xs" disabled={this.state.disableButtons} onClick={() => this.getLevel(nextLevel, currLevel)} >Show Level {nextLevel}</button>
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
             <div className="panel panel-default">
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

            <button className="btn btn-warning btn-xs" disabled={this.state.disableButtons} onClick={() => this.getLevel(nextLevel, currLevel)} >Show Level {nextLevel}</button>
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

            <button className="btn btn-warning btn-xs" disabled={this.state.disableButtons} onClick={() => this.getLevel(nextLevel, currLevel)} >Show Level {nextLevel}</button>
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

            <button className="btn btn-warning btn-xs" disabled={this.state.disableButtons} onClick={() => this.getLevel(nextLevel, currLevel)} >Show Level {nextLevel}</button>
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
                className="btn btn-primary" 
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
        <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <h3>{this.state.currSponsor.fullName}</h3>
              <h3>Contact: {this.state.currSponsor.number}</h3>
              <h3>Email: {this.state.currSponsor.email}</h3>
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

  render() {
    var user = this.state.user_data

    return(
      <div>
        <Nav active="home" />

        <div>
           <div className="jumbotron jumbotron">
              <center>
               
              </center>   
            </div>
        </div>

        <div className="container" style={{marginBottom: 150}} >
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
    )
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