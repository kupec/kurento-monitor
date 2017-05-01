import React, {Component} from 'react';
import {MediaElementList} from '..';
import {ServerInfo} from '../../components';
import './Monitor.css';

class Monitor extends Component {
    render() {
        return (
            <div>
                <ServerInfo />
                <MediaElementList/>
            </div>
        );
    }
}

export default Monitor;
