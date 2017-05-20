import React, {Component} from 'react';
import {Monitor, Connect} from '..';

import './Content.css';

const VIEWS = {
    connect: 0,
    monitor: 1
};

class Content extends Component {
    state = {
        view: VIEWS.connect
    };

    switchView(view) {
        this.setState({view});
    }

    resolveContent() {
        const {view} = this.state;

        const onMonitorStarted = this.switchView.bind(this, VIEWS.monitor);
        switch (view) {
            case VIEWS.connect:
                return (<Connect onMonitorStarted={onMonitorStarted}/>);
            case VIEWS.monitor:
                return (<Monitor />);
            default:
                return (<div></div>);
        }
    }

    render() {
        const content = this.resolveContent();
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Content;
