import React, {Component} from 'react';
import Nav from './components/Nav';

class About extends Component {
    render() {
        return (
            <div>
                <Nav active="about"/>
                <div className="container ">
                <div className="row ">
                <div className="col-md-12 color-white">
                      <h1 class="text-color">About Us</h1>
				<div className="panel color-back">
                
						<div className="pull-right">
						</div>
					</div>
                    
					<div className="panel-body color-back">
						<input type="text" className="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
					</div>
                          <div className='span8 main'>
                       
                        <p>Comforter Coin is at Pre-Launch stage. We will evolve into a full global crypto currency in due course.</p> 

                        <p>We will soon be Block-chain based.</p>
                        <p>Our coins will be traded on various exchanges.</p>
                        <p>Some Benefits:</p>
                
                            Members can be sure of a 50% growth per month on their investment in Comforter Coin.
                            For network lovers:
                            <ul>
                            <li >No limit placed on number of people one can sponsor.</li>
                            <li>All your direct referrals are placed on the first level and you are paid 13.333% on them within 24 hours.</li>
                            <li>Your second level downline benefits you 6.666% within 24 hours.</li>
                            <li>30 members in your downline to level 5 qualify you to R1 500 membership in Data Community which pays you 35% per month.</li>
                            <li>300 members in your downline qualifies you to join Norland at R6000, paving your way to upgrade to Diamond level.</li>
                            <li>1000 members in your downline qualifies you for an iPhone 7, iPad Pro or a MacBook Pro.</li>
                            <li>2000 members qualify you for R5000 per month for 12 months.</li>
                            <li>4000 members qualify you for a car valued at no less than R200 000.</li>
                            <li>8000 members qualify you for a house fully furnished, no less than R1m.</li>
                            <li>In our presentations, we will tell you more about our 'half-match' bonuses</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
}

export default About;