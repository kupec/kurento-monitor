import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListItem, Checkbox} from 'material-ui';
import {inNonStandartRegExp} from './PipelinesFiltering';
const MEDIA_PIPELINE_NAME = 'MediaPipeline';

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

    static getChildrenInfo(element) {
        if (!element || element.type !== MEDIA_PIPELINE_NAME) return '';
        let result = ': children - ';
        if (!element.childrens || element.childrens.length === 0) return result + '0';
        const childrenTypes = {};
        element.childrens.forEach(child => {
          if (!childrenTypes[child.type]) {
              childrenTypes[child.type] = 1;
          }  else {
              childrenTypes[child.type] += 1;
          }
        });
        result += element.childrens.length;
        const typesNames = Object.keys(childrenTypes);
        typesNames.forEach(type => {
            result += `, ${type} - ${childrenTypes[type]}`;
        });
        return result;
    }

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
        const childrenInfo = MediaElementListItem.getChildrenInfo(element);
        const primaryText = (
            <span>
                {`${element.type}${childrenInfo}`}
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
