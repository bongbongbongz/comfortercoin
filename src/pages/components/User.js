import React, {Component} from 'react';

class User extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.level}</h1>
                {this.props.users.map(user=>{
                    return <h5 key={user.name}>{user.name}</h5>
                })}
            </div>
        );
    }
}

export default User;