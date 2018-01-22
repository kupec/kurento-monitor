import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Graph.css';

export default class Legend extends Component {
    static propTypes = {
        colors: PropTypes.object
    };

    render() {
        const {colors} = this.props;
        return (<div className="legendContainer">
                {Object.keys(colors).map(type => {
                    return (<div key={type} >
                        <div className="legendElem" style={{backgroundColor: colors[type]}}/>
                        <div>{type}</div>
                    </div>);
                })}
            </div>)
    }
}
