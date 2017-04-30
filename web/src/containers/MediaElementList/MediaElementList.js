import React, {Component} from 'react';
import {MediaElementList, ActionBar} from '../../components';
import './MediaElementList.css';

class MediaElementListContainer extends Component {
    state = {
        selectedItems: []
    };

    clearSelection() {
        this.setState({selectedItems: []});
    }

    onElementChecked(id, state) {
        const {selectedItems} = this.state;
        if (state) {
            selectedItems.push(id);
        } else {
            const index = selectedItems.indexOf(id);
            selectedItems.splice(index, 1);
        }
        this.setState({selectedItems});
    }

    render() {
        const {selectedItems} = this.state;
        return (
            <div>
                <ActionBar selectedItems={selectedItems} clearSelection={this.clearSelection.bind(this)}/>
                <MediaElementList selectedItems={selectedItems} onElementChecked={this.onElementChecked.bind(this)}/>
            </div>
        );
    }
}

export default MediaElementListContainer;
