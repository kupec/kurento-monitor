import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MediaElementList} from '..';
import {ServerInfo} from '../../components';
import {subscribeIO} from '../../components/common';
import './Monitor.css';

@subscribeIO({'monitor:serverInfo': 'serverInfo'})
class Monitor extends Component {
    static propTypes = {
        serverInfo: PropTypes.object
    };

    render() {
        const {serverInfo} = this.props;
        return (
            <div>
                <ServerInfo serverInfo={serverInfo}/>
                <MediaElementList/>
            </div>
        );
    }
}

export default Monitor;
