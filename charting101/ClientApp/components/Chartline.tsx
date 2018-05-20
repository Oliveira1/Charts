// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { Link,RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ApplicationState } from '../store';
import * as TransactionEntriesState from '../store/TransactionEntries';
import { bindActionCreators } from 'redux';

type TransactionEntryProps =
    TransactionEntriesState.TransactionEntriesState       // ... state we've requested from the Redux store
    & typeof TransactionEntriesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; 

var total= 0;
var entries = [] as any;

class Chartline extends React.Component<TransactionEntryProps, {}> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
       // console.log("COCO", this.props.actions.counterActions.requestTransactionEntries(0));
        //console.log("AHN", this.props.transactionEntries);

        //this.props.actions.counterActions.requestTransactionEntries(startDateIndex);
        this.props.requestTransactionEntries(startDateIndex);
        //entries = this.props.transactionEntries.entries;
        entries = this.props.entries;
        total = entries.length;
        
    }

    componentWillReceiveProps(nextProps: TransactionEntryProps) {
        // This method runs when incoming props (e.g., route params) change
        let startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;
        //console.log("AHN", this.props.transactionEntries);
        //this.props.actions.counterActions.requestTransactionEntries(startDateIndex);
        //entries = this.props.transactionEntries.entries; dot={true} label={{ fill: 'red', fontSize: 20 }}  />
        entries = this.props.entries;
        total = entries.length;
    }
    
    public render() {
        return (
                <LineChart width={2800} height={900} data={entries}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis interval={0} dataKey="date"/>
                <YAxis interval={0} type="number" domain={['dataMin', 'dataMax']} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="saldo" stroke="#8884d8" /> 
            </LineChart>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.transactionEntries, // Selects which state properties are merged into the component's props
    TransactionEntriesState.actionCreators                 // Selects which action creators are merged into the component's props
)(Chartline) as typeof Chartline;