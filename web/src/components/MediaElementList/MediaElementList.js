import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, Subheader} from 'material-ui';
import MediaElementListItem from './MediaElementListItem';
import SelectAllCheckbox from './SelectAllCheckbox';
import SearchField from './SearchField';
import {filterMatchingRegExp, inNonStandartRegExp} from './PipelinesFiltering';
import './MediaElementList.css';

class MediaElementList extends Component {
    static propTypes = {
        pipelines: PropTypes.array,
        onElementChecked: PropTypes.func.isRequired,
        selectedItems: PropTypes.array.isRequired,
        onSearchChange: PropTypes.func.isRequired,
        regexp: PropTypes.any
    };

    onSelectAll(event, checked) {
        this.props.onElementChecked('all', checked);
    }

    onSearchChange(event, newValue) {
        this.props.onSearchChange(newValue);
    }

    renderMediaElementListItems(elements, nestedClassName) {
        if (!elements) {
            return [];
        }

        const {selectedItems, onElementChecked, regexp} = this.props;
        return elements.map((el, i) => {
            const nestedItems = this.renderMediaElementListItems(el.childrens, 'nested');
            const expended = inNonStandartRegExp(regexp) && nestedItems.length;
            return <MediaElementListItem key={i}
                                         element={el}
                                         nestedClassName={nestedClassName}
                                         regexp={regexp}
                                         selectedItems={selectedItems}
                                         onElementChecked={onElementChecked}
                                         expended={!!expended}
                                         nestedItems={this.renderMediaElementListItems(el.childrens, 'nested')}/>;
        });
    }

    render() {
        const {pipelines, regexp} = this.props;

        const filtered = filterMatchingRegExp(pipelines, regexp);
        const mediaElementListItems = this.renderMediaElementListItems(filtered);
        const showComponent = pipelines && pipelines.length > 0;
        if (!showComponent) {
            return null;
        }
        return (
            <List>
                <Subheader>Media elements:</Subheader>
                <div className="topMediaElementsBar">
                    <SelectAllCheckbox onCheck={this.onSelectAll.bind(this)}/>
                    <SearchField onChange={this.onSearchChange.bind(this)}/>
                </div>
                {mediaElementListItems}
            </List>
        );
    }
}

export default MediaElementList;
