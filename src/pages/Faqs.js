import React, {Component} from 'react';
import Nav from './components/Nav';

class Faqs extends Component {
    
  
    render() {
        return (
            <div>
                <Nav active="about"/>
               <div className="container">
                <div className="row">
                     <div className="col-md-12 color-white">
                      <h1 class="color-back">FAQ’s:</h1>
				<div className="panel color-back">
                
						<div className="pull-right">
						</div>
					</div>
                    
					<div className="panel-body  color-back">
						<input type="text" className="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
					</div>
                          <div className='span8 main'>
                       
                        <p className="bg-success">Q: What is the rate of growth?</p>
                        <p className="bg-info">A: 50% Compounding per month.</p> 
                        <br/>
                        <p className="bg-success">Q: Can members sell their coins?</p>
                        <p className="bg-info"> A: Yes, soon this will be made available, but for now members buy coins from the company and sell to the company.</p>
                        <br/>
                        <p className="bg-success">Q: Can members pay cash to buy Comforter coins?</p>
                        <p className="bg-info"> A: No, only Bitcoins are acceptable and Comforter Coin pays members in Bitcoins.</p>
                   
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Faqs;