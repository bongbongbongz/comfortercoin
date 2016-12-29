import React, {Component} from 'react';
import Nav from './components/Nav';

class About extends Component {
    render() {
        return (
            <div>
                <Nav active="about"/>
                <div className="container">   
                    About page
                </div>   
            </div>
        );
    }
}

export default About;