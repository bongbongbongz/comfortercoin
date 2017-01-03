import React, {Component} from 'react';

class User extends Component {
    render() {
        return (
     <div className="container">
    	<div className="row">
			<div className="col-md-12 ">
				<div className="panel">
					<div className="panel-heading panel-color">
						<h3 className="panel-title ">Level {this.props.level}</h3>
						<div className="pull-right">
						</div>
					</div>
					<div className="panel-body">
						<input type="text" className="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
					</div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    
                                    <th>bitcoinWallet</th>
                                    <th>email</th>
                                    <th>Name & Surname</th>
                                    <th>Contact Number</th>
                                   
                                </tr>
                                {this.props.users.map(user=>{
                                    return (<tr key={user.number}>
                                        <td>{user.bitcoinWallet}</td>
                                        <td>{user.email}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.number}</td>
                                    </tr>);
                                })}
                            </tbody>
                        </table>
				    </div>
				</div>
			</div>
           </div>
            </div>
        );
    }
}

export default User;

