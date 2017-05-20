import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Subheader} from 'material-ui';
import store from 'store';
import './LastKurentoUrls.css';

class LastKurentoUrls extends Component {
    static propTypes = {
        handleConnect: PropTypes.func.isRequired
    };

    renderUrls() {
        const urls = store.get('lastUrls');
        if (!urls) {
            return null;
        }
        const {handleConnect} = this.props;
        return urls.map((url, i) => {
            return (
                <div key={i}
                     onClick={handleConnect.bind(null, url)}>
                    {url}
                </div>
            );
        })
    }

    render() {
        const urls = this.renderUrls();
        if (!urls) {
            return null;
        }
        return (
            <div className="LastKurentoUrlsContainer">
                <Subheader className="LastConnectedSubheader">Last connected urls:</Subheader>
                {urls}
            </div>
        );
    }
}

export default LastKurentoUrls;
