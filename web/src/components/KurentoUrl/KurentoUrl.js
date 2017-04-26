import React, {Component} from 'react';
import {TextField, FlatButton} from 'material-ui';
import IOController from '../../controllers/io';
import './KurentoUrl.css';

class KurentoUrl extends Component {
    handleConnect() {
        const {kurentoUrl} = this.refs;
        const url = kurentoUrl.getValue().trim();
        IOController.send('monitor:start', {url}, this.onMonitorStarted.bind(this));
    }

    onMonitorStarted(error) {
        if (error) {
            return null;
        }
        console.log('monitor started');
    }

    render() {
        return (
            <div className="kurentoUrlContainer">
                <TextField ref="kurentoUrl" floatingLabelText="Kurento url"/>
                <FlatButton onClick={this.handleConnect.bind(this)} label="Connect"/>
            </div>
        );
    }
}

export default KurentoUrl;
