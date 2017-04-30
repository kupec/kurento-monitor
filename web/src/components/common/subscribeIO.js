import React, {Component} from 'react';
import IOController from '../../controllers/io';

export default function subscribeIO(mapEventToProps) {
    return function wrap(WrappedComponent) {
        return class extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    data: {}
                };
            }

            componentDidMount() {
                Object.keys(mapEventToProps).forEach(event => {
                    IOController.on(event, this.handleEvent.bind(this, mapEventToProps[event]));
                });
            }

            componentWillUnmount() {
                Object.keys(mapEventToProps).forEach(event => {
                    IOController.removeListener(event, this.handleEvent.bind(this, mapEventToProps[event]));
                });
            }

            handleEvent(prop, result) {
                const {data} = this.state;
                data[prop] = result;
                this.setState({data});
            }

            render() {
                const allProps = {...this.state.data, ...this.props};
                return <WrappedComponent {...allProps} />;
            }
        };
    }
}