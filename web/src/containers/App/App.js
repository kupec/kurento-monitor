import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Header} from '../../components';
import Content from '../Content/Content';

import IOController from '../../controllers/io';
import './App.css';

injectTapEventPlugin();
IOController.init();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="app">
                    <Header />
                    <Content />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
