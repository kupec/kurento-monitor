import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IOController from '../../controllers/io';
import {FlatButton} from 'material-ui';
import Graph from 'react-graph-vis';
import Legend from './Legend.js';
import './Graph.css';
import Controls from './Controls';
const COLORS = {
    'AUDIO&&VIDEO&&DATA': 'black',
    'AUDIO&&VIDEO': 'yellow',
    'AUDIO&&DATA': 'purple',
    'VIDEO&&DATA': 'blue',
    'AUDIO': 'red',
    'VIDEO': 'green',
    'DATA': 'orange'
};

const PHYSICS = {
    timestep: 0.1,
    stabilisation: false,
    maxVelocity: 1,
    minVelocity: 1,
    solver: 'repulsion'
}


export default class GraphContainer extends Component {
    static propTypes = {
        element: PropTypes.object,
        onClose: PropTypes.func
    }

    state = {nodes: [], edges: [], showConnect: false, connectedElems: []};

    componentDidMount() {
        const {childrens} = this.props.element;
        this.addNodes(childrens);
        IOController.send('kurento:getSources', {elements: childrens});
        IOController.on('kurento:sourcesInfo', this.addEdges);
        this.timer = setInterval(() => {
            const {childrens} = this.props.element;
            this.setState({edges: []});
            IOController.send('kurento:getSources', {elements: childrens});
        }, 3000)
    }

    componentWillReceiveProps(newProps) {
        let diff = false;
        const oldChildren = this.props.element.childrens;
        const newChildren = newProps.element.childrens;
        oldChildren.forEach(child => {
            diff = true;
            newChildren.forEach(newChild => {
                if (newChild.id === child.id) diff = false;
            })
        });

        if (oldChildren.length !== newChildren.length) diff = true;

        if (diff) {
            this.addNodes(newChildren);
            this.setState({edges: []});
            IOController.send('kurento:getSources', {elements: newChildren});
        }
    }

    componentWillUnmount() {
        IOController.removeListener('kurento:sourcesInfo', this.addEdges);
        clearInterval(this.timer);
    }

    getEdgeOptions(edge) {
        const {type} = edge;
        const result = {};
        let color = null;
        if (type.includes('VIDEO') && type.includes('AUDIO') && type.includes('DATA')) {
            color = COLORS['AUDIO&&VIDEO&&DATA'];
        } else if (type.includes('VIDEO') && type.includes('AUDIO')) {
            color = COLORS['VIDEO&&AUDIO'];
        } else if (type.includes('VIDEO') && type.includes('DATA')) {
            color = COLORS['VIDEO&&DATA'];
        } else if (type.includes('AUDIO') && type.includes('DATA')) {
            color = COLORS['AUDIO&&DATA'];
        } else {
            color = COLORS[type];
        }
        result.color = {color};
        result.width = 2;
        return result;

    }

    addEdges = (data) => {
        const {result} = data;
        if (!result) return;
        const edges = [...this.state.edges];
        result.forEach(elem => {
            edges.push({from: elem.source, to: elem.sink, type: elem.type});
        });
        this.setState({edges});
    }

    addNodes = (children) => {
        const length = Math.ceil(Math.pow(children.length, 1/2));
        const nodes = children.map((child, i) => {
            return {id: child.id,
            label: child.name,
            shape: 'box',
            physics: false,
            x: Math.floor(i % length - 1) * 300,
            y: Math.round(i / length - 1) * 100,
            widthConstraint: {
                minimum: 30,
                maximum: 300
            }

        }});
        this.setState({nodes});
    }

    reduceEdges(edges) {
        const cash = {};
        edges.forEach(edge => {
            const key = edge.from + edge.to;
            if (!cash[key]) {
                cash[key] = {...edge};
            } else {
                cash[key].type += '&&' + edge.type;
            }
        });

        let result = Object.keys(cash);
        result = result.map(key => {
            return {...cash[key], ...this.getEdgeOptions(cash[key])};
        });
        return result;
    }

    handleConnect = () => {
        const {nodes} = this.state;
        this.setState({showConnect: !this.state.showConnect, connectedElems: []});
    };

    getEvent = () => {
        return {select: this.handleSelectNodeForConnect};
    };

    handleSelectNodeForConnect = (event) => {
        const {nodes} = event;
        const eventName = nodes[0];
        const {connectedElems} = this.state;
        let newElems = [];
        if (connectedElems.length < 2) {
            newElems = [...connectedElems];
        }
        newElems.push(eventName);
        this.setState({connectedElems: newElems});

    }

    render() {
        const {onClose, element} = this.props;
        const {nodes, edges, connectedElems} = this.state;
        const viewedEdges = this.reduceEdges(edges);
        return (
            <div open className="graphMainContainer">
                <Controls onClose={onClose} pipelineId={element.id} onConnect={this.handleConnect} connectedElems={connectedElems}/>
                <Legend colors={COLORS}/>
                <Graph graph={{nodes, edges: viewedEdges, physics: PHYSICS}} events={{select: this.handleSelectNodeForConnect}}/>
            </div>
        )
    }
}
