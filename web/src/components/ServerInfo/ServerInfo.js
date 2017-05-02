import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Subheader, Table, TableBody, TableRow, TableRowColumn} from 'material-ui';
import './ServerInfo.css';

class ServerInfo extends Component {
    static propsTypes = {
        serverInfo: PropTypes.object
    };

    render() {
        const {serverInfo} = this.props;
        if (!serverInfo) {
            return null;
        }
        const usedMemory = parseInt(serverInfo.usedMemory / 1024, 10);
        return (
            <div>
                <Subheader>Server info:</Subheader>
                <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Type</TableRowColumn>
                            <TableRowColumn>{serverInfo.type}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Version</TableRowColumn>
                            <TableRowColumn>{serverInfo.version}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Used memory</TableRowColumn>
                            <TableRowColumn>{usedMemory} MB</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default ServerInfo;
