import React, {Component} from 'react';
import User from './components/User';
import Nav from './components/Nav';
import firebase from '../api/firebase';
class Home extends Component {
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
    }

    getChildren(data, levelArr, parent, nodeparent){
        var that = this;
        // console.log(`https://comforter-co.firebaseio.com/smartMoney/users/${parent}/children.json?orderBy="$key"`);
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
            // console.log(responseData, parent);

            if(!data.hasOwnProperty(parent)){
              ++this.level;
              console.log("InCREING on "+this.level);
            }else{
            //   console.log("AVAILABLE:  " + data[parent] + "  LEVEL:  " + this.level);
            }
            // console.log(data[parent]);
            data[parent] = levelArr[this.level] = Object.assign({}, data[parent], responseData);
            // levelArr[level] = data[parent];
            // console.log("LEVELLLL "+this.level);
              for(var key in responseData){
                //   console.log(this.level, key, "YEAHHHHHHHH");
                if (responseData.hasOwnProperty(key)) {
                    that.getDetails(this.level, key);
                    that.getChildren(data, levelArr, key, responseData[key])
                }
              }
              
          }
              
          console.log(data, levelArr);
        }

      });
  }

    getDetails(level, parent){
    console.log("LEVELLLL "+level);
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
        // console.log(users);
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

}

export default Home;