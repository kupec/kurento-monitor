import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatButton, Dialog, SelectField, MenuItem, TextField} from 'material-ui';
import IOController from '../../controllers/io';
import './Graph.css';

const ELEM_LIST = ['PassThrough', 'Composite','Mixer', 'PlayerEndpoint', 'RecorderEndpoint', 'RtpEndpoint', 'WebRtcEndpoint',
 'FaceOverlayFilter', 'GStreamerFilter', 'ImageOverlayFilter', 'ZBarFilter','OpenCVFilter'];

const CONNECT_TYPE = ["AUDIO&VIDEO", "AUDIO", "VIDEO"];
export default class Legend extends Component {
    static propTypes = {
        colors: PropTypes.object,
        onClose: PropTypes.func,
        pipelineId: PropTypes.string,
        connectedElems: PropTypes.array
    };

    state = {
        elemToCreate: 'WebRtcEndpoint',
        showCreate: false,
        params: '{"name": "WebRtcEndpoint"}',
        connectType: "AUDIO&VIDEO"
    };

    handleShowCreatePopup = () => {
        this.setState({showCreate: true});
    };

    handleHideCreatePopup = () => {
        this.setState({showCreate: false});
    };

    handleCreate = () => {
        const {elemToCreate, params} = this.state;
        const {pipelineId} = this.props;
        IOController.send('kurento:createElement', {elemToCreate, params, pipelineId});
        this.handleHideCreatePopup();
    };

    handleSetElemToCreate(first, second, elemToCreate) {
        this.setState({elemToCreate});
    }

    handleSetConnectType(first, second, connectType) {
        this.setState({connectType});
    }

    handleSetParams(event, params) {
        event.stopPropagation();
        this.setState({params});
    }

    handleConnect = () => {
        const {connectedElems} = this.props;
        const {connectType} = this.state;
        IOController.send('kurento:connectElems', {elems: connectedElems, type: connectType});
    };

    render() {
        const {onClose, connectedElems} = this.props;
        const {showCreate, elemToCreate, params, connectType} = this.state;
        return (
            <div>
                <FlatButton primary
                            onClick={onClose}
                            label="Close"/>
                <FlatButton primary
                            label="Create"
                            onClick={this.handleShowCreatePopup}/>
                <FlatButton primary
                            label="Connect"
                            className="connectButton"
                            disabled={connectedElems.length < 2}
                            onClick={this.handleConnect}>
                    <div className="choosedContainer">
                        <div>from</div>
                        <div>{connectedElems[0]}</div>
                        <div>to</div>
                        <div>{connectedElems[1]}</div>
                    </div>
                </FlatButton>
                <SelectField
                    value={connectType}
                    onChange={this.handleSetConnectType.bind(this)}>
                    {CONNECT_TYPE.map(elem => <MenuItem value={elem} primaryText={elem}/>)}
                </SelectField>

                <Dialog open={showCreate} onClose={this.handleHideCreatePopup}>
                    <div className="dialogBodyContainer">
                        <SelectField
                            value={elemToCreate}
                            onChange={this.handleSetElemToCreate.bind(this)}>
                            {ELEM_LIST.map(elem => <MenuItem value={elem} primaryText={elem}/>)}
                        </SelectField>
                        <TextField defaultValue={params} onChange={this.handleSetParams.bind(this)}/>
                        <FlatButton primary
                                label="Create"
                                onClick={this.handleCreate}/>
                    </div>
                </Dialog>
            </div>
        )
    }
}