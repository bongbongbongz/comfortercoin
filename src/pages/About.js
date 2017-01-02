import React, {Component} from 'react';
import Nav from './components/Nav';

class About extends Component {
    render() {
        return (
            <div>
                <Nav active="about"/>
                <div className="container">
                <div className="row">
                     <div className="col-md-12 ">
				<div className="panel">
					<div className="panel-heading panel-color">
						<h3 className="panel-title ">ConforterCoin Contact Information</h3>
						<div className="pull-right">
						</div>
					</div>
					<div className="panel-body">
						<input type="text" className="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
					</div>
                    <div>
                           <div class="panel-body">Email :comfortercoins@gmail.com </div>   
                            <div class="panel-body">Tel :0813003900 </div>   
                    </div>
				</div>
			</div>
            </div>
                </div>
                </div>
        );
    }
}

export default About;