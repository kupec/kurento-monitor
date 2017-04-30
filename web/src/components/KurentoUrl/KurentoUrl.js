import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextField, FlatButton} from 'material-ui';
import IOController from '../../controllers/io';
import './KurentoUrl.css';

class KurentoUrl extends Component {
    static propTypes = {
        onMonitorStarted: PropTypes.func.isRequired
    };

    handleConnect() {
        const {kurentoUrl} = this.refs;
        const url = kurentoUrl.getValue().trim();
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
            <div className="kurentoUrlContainer">
                <TextField ref="kurentoUrl" floatingLabelText="Kurento url" defaultValue="ws://localhost:8888/kurento"/>
                <FlatButton className="connectButton" onClick={this.handleConnect.bind(this)} label="Connect"/>
            </div>
        );
    }
}

export default KurentoUrl;
