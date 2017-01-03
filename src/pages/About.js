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
                      <h1 class="color-back">About Us</h1>
				<div className="panel color-back">
                
						<div className="pull-right">
						</div>
					</div>
                    
					<div className="panel-body  color-back">
						<input type="text" className="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
					</div>
                          <div className='span8 main'>
                       
                        <p>Confoter Coin is at Pre Launch stage. We will evolve into a full global crypto currency in due course.</p> 

                        <p>We will soon be Block-chain based.</p>
                        <p>Our coins will be traded on various exchanges.</p>
                        <p>Some Benefits:</p>
                        <p>
                            Members can be sure of a 50% growth per month on their investment in Comforter Coin.
                            For network lovers:
                            No limit placed on number of people one can sponsor.
                            All your direct referrals are placed on the first level and you are paid 13.333% on them within 24 hours.
                            Your second level downline benefits you 6.666% within 24 hours. 
                            30 members in your downline to level 5 qualify you to R1 500 membership in Data Community which pays you 35% per month.
                            300 members in your downline qualifies you to join Norland at R6000, paving your way to upgrade to Diamond level. 
                            1000 members in your downline qualifies you for an iPhone 7, iPad Pro or a MacBook Pro.
                            2000 members qualify you for R5000 per month for 12 months.
                            4000 members qualify you for a car valued at no less than @200 000.
                            8000 members qualify you for a house fully furnished, no less than R1m.
                            In our presentations, we will tell you more about our “half-month’bonuses</p>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
}

export default About;