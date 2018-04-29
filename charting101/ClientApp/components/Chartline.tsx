// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ApplicationState } from '../store';
import * as TransactionEntriesState from '../store/TransactionEntries';

// At runtime, Redux will merge together...
type TransactionEntryProps =
    TransactionEntriesState.TransactionEntriesState       // ... state we've requested from the Redux store
    & typeof TransactionEntriesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

var total= 0;

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

class Chartline extends React.Component<TransactionEntryProps, {}> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        this.props.requestTransactionEntries(startDateIndex);
        total = this.props.entries.length;
    }

    componentWillReceiveProps(nextProps: TransactionEntryProps) {
        // This method runs when incoming props (e.g., route params) change
        let startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;
        this.props.requestTransactionEntries(startDateIndex);
        total = this.props.entries.length;
    }
    
    public render() {
        return (
            <LineChart width={2800} height={900} data={this.props.entries}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis interval={0} dataKey="week"/>
                <YAxis interval={0} type="number" domain={['dataMin', 'dataMax']} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="saldo" stroke="#8884d8" dot={true} label={{ fill: 'red', fontSize: 20 }}  />
            </LineChart>
        );
    }


}

export default connect(
    (state: ApplicationState) => state.transactionEntries, // Selects which state properties are merged into the component's props
    TransactionEntriesState.actionCreators                 // Selects which action creators are merged into the component's props
)(Chartline) as typeof Chartline;
