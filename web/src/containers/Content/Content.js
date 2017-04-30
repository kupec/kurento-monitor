import React, {Component} from 'react';
import {KurentoUrl} from '../../components';
import {MediaElementList} from '..';

import './Content.css';

const VIEWS = {
    kurentoUrl: 0,
    mediaElementList: 1
};

class Content extends Component {
    state = {
        view: VIEWS.kurentoUrl
    };

    switchView(view) {
        this.setState({view});
    }

    resolveContent() {
        const {view} = this.state;

        const onMonitorStarted = this.switchView.bind(this, VIEWS.mediaElementList);
        switch (view) {
            case VIEWS.kurentoUrl:
                return (<KurentoUrl onMonitorStarted={onMonitorStarted}/>);
            case VIEWS.mediaElementList:
                return (<MediaElementList />);
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
