import React, {Component} from 'react';
import Nav from './components/Nav';

class About extends Component {
    render() {
        return (
            <div>
                <Nav active="about"/>
                <div className="container">   
                 <div className="panel-group">
                    <div className="panel panel-default">
                    <div className="panel-heading">Panel with panel-default class</div>
                    <div className="panel-body">Panel Content</div>
                    </div>
                    </div>
                </div>   
            </div>
        );
    }
}

export default About;