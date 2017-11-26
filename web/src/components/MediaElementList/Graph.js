import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IOController from '../../controllers/io';
import {FlatButton} from 'material-ui';
import Graph from 'react-graph-vis';

export default class GraphContainer extends Component {
    static propTypes = {
        element: PropTypes.object,
        onClose: PropTypes.func
    }

    state = {nodes: [], edges: []};

    componentDidMount() {
        const {childrens} = this.props.element;
        this.addNodes(childrens);
        IOController.send('kurento:getSources', {elements: childrens});
        IOController.on('kurento:sourcesInfo', this.addEdges)
    }

    componentWillUnmount() {
        IOController.removeListener('kurento:sourcesInfo', this.addEdges)
    }

    addEdges = (data) => {
        const {result} = data;
        if (!result) return;
        const edges = [...this.state.edges];
        result.forEach(elem => {
            edges.push({from: elem.source, to: elem.sink, label: elem.type});
        });
        this.setState({edges});
    }

    addNodes = (children) => {
        const nodes = children.map(child => {return {id: child.id,
            label: child.name,
            physics: false,
            shape: child.name.includes('publish') ? 'ellipse' : 'box',
            widthConstraint: {
                minimum: 30,
                maximum: 300
            }

        }});
        this.setState({nodes});
    }

    render() {
        const {onClose} = this.props;
        const {nodes, edges} = this.state;
        return (
            <div open
                    style={{height: '100vh',
                        width: '100vw',
                        position: 'fixed',
                        zIndex: 1500,
                        left: '0',
                        top: '0',
                        background: 'rgba(255,255,255,0.95)'}}>
                <FlatButton primary
                            onClick={onClose}
                            label="Close"/>
                <Graph graph={{nodes, edges}}/>
            </div>
        )
    }
}
