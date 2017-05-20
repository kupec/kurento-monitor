import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MediaElementList, ActionBar} from '../../components';
import {subscribeIO} from '../../components/common';
import {onSelectAll, onSelectOneItem} from './MediaElementSelection';
import './MediaElementList.css';

@subscribeIO({'monitor:pipelines': 'pipelines'})
class MediaElementListContainer extends Component {
    static propTypes = {
        pipelines: PropTypes.array
    };

    state = {
        selectedItems: [],
        allChecked: false,
        regexp: new RegExp('.*', 'gi')
    };

    clearSelection() {
        this.setState({selectedItems: [], allChecked: false});
    }

    onElementChecked(id, state) {
        const {pipelines} = this.props;
        const {allChecked, selectedItems} = id === 'all'
            ? onSelectAll(state, pipelines)
            : onSelectOneItem(this.state.selectedItems, id, state);

        this.setState({selectedItems, allChecked});
    }

    onSearchChange(newValue) {
        const regexp = new RegExp(newValue || '.*', 'gi');
        this.setState({regexp, selectedItems: []});
    }

    render() {
        const {pipelines} = this.props;
        const {selectedItems, regexp} = this.state;
        return (
            <div>
                <ActionBar
                    selectedItems={selectedItems}
                    clearSelection={this.clearSelection.bind(this)}
                />
                <MediaElementList
                    selectedItems={selectedItems}
                    onElementChecked={this.onElementChecked.bind(this)}
                    onSearchChange={this.onSearchChange.bind(this)}
                    pipelines={pipelines}
                    regexp={regexp}
                />
            </div>
        );
    }
}

export default MediaElementListContainer;
