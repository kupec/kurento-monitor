import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListItem, Checkbox} from 'material-ui';

class MediaElementListItem extends Component {
    static propTypes = {
        onElementChecked: PropTypes.func.isRequired,
        selectedItems: PropTypes.array.isRequired,
        element: PropTypes.object.isRequired,
        nestedItems: PropTypes.any,
        nestedClassName: PropTypes.string
    };

    onElementChecked(id, event, state) {
        this.props.onElementChecked(id, state);
    }

    render() {
        const {selectedItems, element, nestedItems, nestedClassName} = this.props;
        const isChecked = selectedItems.indexOf(element.id) > -1;
        const leftCheckBox = (<Checkbox checked={isChecked} onCheck={this.onElementChecked.bind(this, element.id)}/>);
        const secondaryText = (
            <p>
                Created at: {element.creationTime}<br />
                Name: {element.name}
            </p>
        );
        return (
            <div className={nestedClassName}>
                <ListItem
                    primaryText={element.type}
                    autoGenerateNestedIndicator={true}
                    leftCheckbox={leftCheckBox}
                    secondaryText={secondaryText}
                    secondaryTextLines={2}
                    nestedItems={nestedItems}/>
            </div>
        );
    }
}

export default MediaElementListItem;
