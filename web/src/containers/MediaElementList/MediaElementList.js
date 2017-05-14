import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MediaElementList, ActionBar} from '../../components';
import {subscribeIO} from '../../components/common';
import {getAllElementIds} from '../../helpers/pipelines';
import './MediaElementList.css';

@subscribeIO({'monitor:pipelines': 'pipelines'})
class MediaElementListContainer extends Component {
    static propTypes = {
        pipelines: PropTypes.array
    };

    state = {
        selectedItems: [],
        allChecked: false
    };

    clearSelection() {
        this.setState({selectedItems: [], allChecked: false});
    }

    onElementChecked(id, state) {
        const {pipelines} = this.props;
        const {allChecked, selectedItems} = id === 'all'
            ? this.onSelectAll(state, pipelines)
            : this.onSelectOneItem(this.state.selectedItems, id, state);

        this.setState({selectedItems, allChecked});
    }

    onSelectAll(state, pipelines) {
        let allChecked, selectedItems;
        if (state) {
            allChecked = true;
            selectedItems = getAllElementIds(pipelines);
        } else {
            allChecked = false;
            selectedItems = [];
        }
        return {allChecked, selectedItems};
    }

    onSelectOneItem(selectedItems, id, state) {
        let allChecked = false;
        if (state) {
            selectedItems.push(id);
        } else {
            const index = selectedItems.indexOf(id);
            selectedItems.splice(index, 1);
        }
        return {allChecked, selectedItems};
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
