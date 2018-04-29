// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ApplicationState } from '../store';
import Chartline from "./Chartline";
import ChartButton from "./ChartButton";


class ChartElement extends React.Component{

    componentWillMount() {
        // This method runs when the component is first added to the page
        //let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        //this.props.requestTransactionEntries(startDateIndex);

    }
    
    public render() {
        return <div>
                    <Chartline />
                    <ChartButton />
                </div>
    }

}

/*
export default connect(
    (state: ApplicationState) => state.transactionEntries, // Selects which state properties are merged into the component's props
    TransactionEntriesState.actionCreators                 // Selects which action creators are merged into the component's props
)(ChartElement) as typeof ChartElement;
*/
