import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {saveLastUrl} from './domain';
import {KurentoUrl, LastKurentoUrls} from '../../components';
import IOController from '../../controllers/io';

import './Connect.css';

class Connect extends Component {
    static propTypes = {
        onMonitorStarted: PropTypes.func.isRequired
    };

    handleConnect(url) {
        saveLastUrl(url);
        IOController.send('monitor:start', {url}, this.onMonitorStarted.bind(this));
    }

    onMonitorStarted(error) {
        if (error) {
            return null;
        }
        const {onMonitorStarted} = this.props;
        onMonitorStarted();
    }

    render() {
        return (
            <div>
                <KurentoUrl handleConnect={this.handleConnect.bind(this)}/>
                <LastKurentoUrls handleConnect={this.handleConnect.bind(this)}/>
            </div>
        );
    }
}

export default Connect;
