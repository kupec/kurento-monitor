import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListItem, Checkbox} from 'material-ui';
import {inNonStandartRegExp} from './PipelinesFiltering';

class MediaElementListItem extends Component {
    static propTypes = {
        onElementChecked: PropTypes.func.isRequired,
        selectedItems: PropTypes.array.isRequired,
        element: PropTypes.object.isRequired,
        nestedItems: PropTypes.any,
        nestedClassName: PropTypes.string,
        regexp: PropTypes.any,
        expended: PropTypes.bool
    };

    onElementChecked(id, event, state) {
        this.props.onElementChecked(id, state);
    }

    render() {
        const {selectedItems, element, nestedItems, nestedClassName, regexp, expended} = this.props;
        const isChecked = selectedItems.indexOf(element.id) > -1;
        const leftCheckBox = (<Checkbox checked={isChecked} onCheck={this.onElementChecked.bind(this, element.id)}/>);
        const formattedName = inNonStandartRegExp(regexp)
            ? element.name.replace(regexp, '<span>$&</span>')
            : element.name;
        const secondaryText = (
            <p className="secondaryText">
                Created at: {element.creationTime}<br />
                Name: <span className="formattedName" dangerouslySetInnerHTML={{__html: formattedName}}/>
            </p>
        );
        const primaryText = (
            <span>
                {element.type}
                {element.leaked && <span className="leakedNotification">&nbsp;(possible leaked)</span>}
            </span>
        );
        const open = expended ? true : null;
        return (
            <div className={nestedClassName}>
                <ListItem
                    primaryText={primaryText}
                    autoGenerateNestedIndicator={true}
                    leftCheckbox={leftCheckBox}
                    secondaryText={secondaryText}
                    secondaryTextLines={2}
                    nestedItems={nestedItems}
                    open={open}/>
            </div>
        );
    }
}

export default MediaElementListItem;
