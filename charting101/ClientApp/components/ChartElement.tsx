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
import * as TransactionEntriesState from '../store/TransactionEntries';

type TransactionEntryProps =
    TransactionEntriesState.TransactionEntriesState       // ... state we've requested from the Redux store
    & typeof TransactionEntriesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


export default class ChartElement extends React.Component<TransactionEntryProps,{}>{

    public render() {
        return ( <div>
                </div>
        )
    }

}
