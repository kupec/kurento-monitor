import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MediaElementList, ActionBar} from '../../components';
import {subscribeIO} from '../../components/common';
import './MediaElementList.css';

@subscribeIO({'monitor:pipelines': 'pipelines'})
class MediaElementListContainer extends Component {
    static propTypes = {
        pipelines: PropTypes.array
    };

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
        const {pipelines} = this.props;
        const {selectedItems} = this.state;
        return (
            <div>
                <ActionBar
                    selectedItems={selectedItems}
                    clearSelection={this.clearSelection.bind(this)}
                />
                <MediaElementList
                    selectedItems={selectedItems}
                    onElementChecked={this.onElementChecked.bind(this)}
                    pipelines={pipelines}
                />
            </div>
        );
    }
}

export default MediaElementListContainer;
