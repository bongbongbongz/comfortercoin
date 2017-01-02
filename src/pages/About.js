import React, {Component} from 'react';
import Nav from './components/Nav';

class About extends Component {
    render() {
        return (
            <div>
                <Nav active="about"/>
                <div className="container">
                <div className="row">
                <div className="panel-group">

                    <div className="panel panel-danger">
                    <div className="panel-heading">About</div>
                    <div className="panel-body">Comfortercoin</div>
                </div>
                </div>
                </div>
                </div>

            </div>
        );
    }
}

export default About;