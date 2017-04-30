import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, Subheader, Checkbox} from 'material-ui';
import {subscribeIO} from '../common';
import './MediaElementList.css';

@subscribeIO({'monitor:pipelines': 'pipelines'})
class MediaElementList extends Component {
    static propTypes = {
        pipelines: PropTypes.array,
        onElementChecked: PropTypes.func.isRequired,
        selectedItems: PropTypes.array.isRequired
    };

    onElementChecked(id, event, state) {
        this.props.onElementChecked(id, state);
    }

    renderMediaElementListItems(elements) {
        if (!elements) {
            return null;
        }
        return elements.map((el, i) => {
            const nestedItems = this.renderMediaElementListItems(el.childrens);
            const isChecked = this.props.selectedItems.indexOf(el.id) > -1;
            const leftCheckBox = (<Checkbox checked={isChecked} onCheck={this.onElementChecked.bind(this, el.id)}/>);
            const secondaryText = (
                <p>
                    Created at: {el.creationTime}<br />
                    Name: {el.name}
                </p>
            );
            return (
                <ListItem
                    key={i}
                    primaryText={el.type}
                    autoGenerateNestedIndicator={true}
                    leftCheckbox={leftCheckBox}
                    secondaryText={secondaryText}
                    secondaryTextLines={2}
                    nestedItems={nestedItems}
                />
            );
        });
    }

    render() {
        const {pipelines} = this.props;
        const mediaElementListItems = this.renderMediaElementListItems(pipelines);
        return (
            <List>
                <Subheader>Media elements:</Subheader>
                {mediaElementListItems}
            </List>
        );
    }
}

export default MediaElementList;
