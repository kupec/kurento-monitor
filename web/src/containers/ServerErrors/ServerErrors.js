import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {subscribeIO} from '../../components/common';
import './ServerErrors.css';

const SHOWERROR_TIME = 10000;
const MAXIMUM_ERRORS = 10;

@subscribeIO({'app:error': 'error'})
class ServerErrors extends Component {
    static propTypes = {
        error: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.timeouts = {};
        this.state = {
            errors: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const {errors} = this.state;
        errors.push(nextProps.error);
        this.setState({errors}, this.initLastErrorTimeout);
    }

    initLastErrorTimeout() {
        const index = this.state.errors.length - 1;
        this.timeouts[index] = setTimeout(() => {
            let {errors} = this.state;
            errors[index].disabled = true;
            this.setState({errors});
            delete this.timeouts[index];
        }, SHOWERROR_TIME);
    }

    renderErrors() {
        const {errors} = this.state;
        let result = [];
        errors.slice(-MAXIMUM_ERRORS).forEach((err, i) => {
            if (!err.disabled) {
                result.push(<div key={i}>{err.message}</div>);
            }
        });
        return result;
    }

    render() {
        const errors = this.renderErrors();
        if (!errors.length) {
            return null;
        }
        return (
            <div className="MonitorErrorsContainer">
                {errors}
            </div>
        );
    }
}

export default ServerErrors;
