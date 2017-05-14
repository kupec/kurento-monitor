import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, Subheader} from 'material-ui';
import MediaElementListItem from './MediaElementListItem';
import SelectAllCheckbox from './SelectAllCheckbox';
import './MediaElementList.css';

class MediaElementList extends Component {
    static propTypes = {
        pipelines: PropTypes.array,
        onElementChecked: PropTypes.func.isRequired,
        selectedItems: PropTypes.array.isRequired
    };

    onSelectAll(event, checked) {
        this.props.onElementChecked('all', checked);
    }

    renderMediaElementListItems(elements, nestedClassName) {
        if (!elements) {
            return [];
        }
        const {selectedItems, onElementChecked} = this.props;
        return elements.map((el, i) => {
            return <MediaElementListItem key={i}
                                         element={el}
                                         nestedClassName={nestedClassName}
                                         selectedItems={selectedItems}
                                         onElementChecked={onElementChecked}
                                         nestedItems={this.renderMediaElementListItems(el.childrens, 'nested')}/>;
        });
    }

    render() {
        const {pipelines} = this.props;
        const mediaElementListItems = this.renderMediaElementListItems(pipelines);
        const showComponent = mediaElementListItems.length > 0;
        if (!showComponent) {
            return null;
        }
        return (
            <List>
                <Subheader>Media elements:</Subheader>
                <SelectAllCheckbox onCheck={this.onSelectAll.bind(this)}/>
                {mediaElementListItems}
            </List>
        );
    }
}

export default MediaElementList;
