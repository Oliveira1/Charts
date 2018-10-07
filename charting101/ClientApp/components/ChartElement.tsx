// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import {connect, Store} from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ApplicationState } from '../store';
import Chartline from "./Chartline";
import ChartButton from "./ChartButton";
import * as TransactionEntriesState from '../store/TransactionEntries';
import {actionCreators, EntryKeysState} from "../store/EntryKeys";

type MainEntryProps =
    TransactionEntriesState.TransactionEntriesState // ... state we've requested from the Redux store
    & EntryKeysState
    
    
    & RouteComponentProps<{ startDateIndex: Date,keys: string }>; // ... plus incoming routing parameters


class ChartElement extends React.Component<ApplicationState,{}>{


    public render() {
        return (
            <div>
            <Chartline {...this.props} />
            </div>
        )
    }
           
}

const mapStateToProps = (state:ApplicationState )=> {
    return {
        entries :state.transactionEntries, // Selects which state properties are merged into the component's props
        keys : state.transactionKeys,
    }
};
export default connect(
    (state: ApplicationState) =>state,
                {... TransactionEntriesState.actionCreators,// Selects which action creators are merged into the component's props
                ...actionCreators
                }
            )(ChartElement) as typeof  ChartElement
