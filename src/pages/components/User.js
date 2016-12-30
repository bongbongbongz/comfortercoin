import React, {Component} from 'react';

class User extends Component {
    render() {
        return (
            <div>
                <table className="table table-hover">
                <tbody>
                    <tr>
                        <th>address</th>
                        <th>bitcoinWallet</th>
                        <th>Country</th>
                        <th>email</th>
                        <th>fullName</th>
                        <th>number</th>
                        <th>postcode</th>
                    </tr>
                    {this.props.users.map(user=>{
                        return (<tr key={user.number}>
                            <td>{user.address}</td>
                            <td>{user.bitcoinWallet}</td>
                            <td>{user.country}</td>
                            <td>{user.email}</td>
                            <td>{user.fullName}</td>
                            <td>{user.number}</td>
                            <td>{user.postcode}</td>
                        </tr>);
                    })}
                </tbody>
                </table>

            </div>
        );
    }
}

export default User;

