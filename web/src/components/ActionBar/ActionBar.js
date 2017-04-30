import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RaisedButton} from 'material-ui';
import classnames from 'classnames';
import IOController from '../../controllers/io';
import './ActionBar.css';

class ActionBar extends Component {
    static propTypes = {
        selectedItems: PropTypes.array.isRequired,
        clearSelection: PropTypes.func.isRequired
    };

    releaseElements() {
        const {selectedItems, clearSelection} = this.props;
        IOController.send('kurento:release', {elements: selectedItems});
        clearSelection();
    }

    render() {
        const {selectedItems} = this.props;
        const containerClass = classnames('ActionBar', {'hidden': selectedItems.length === 0});
        return (
            <div className={containerClass}>
                <RaisedButton label="Release" onClick={this.releaseElements.bind(this)} secondary={true}/>
            </div>
        );
    }
}

export default ActionBar;
