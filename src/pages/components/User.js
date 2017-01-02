import React, {Component} from 'react';

class User extends Component {
    render() {
        return (
     <div className="container">
    	<div className="row">
			<div className="col-md-12 ">
				<div className="panel">
					<div className="panel-heading panel-color">
						<h3 className="panel-title ">Level</h3>
						<div className="pull-right">
						</div>
					</div>
					<div className="panel-body">
						<input type="text" className="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
					</div>
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
			</div>
           </div>
            </div>
        );
    }
}

export default User;

