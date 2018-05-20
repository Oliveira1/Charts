import * as React from "react";
import { Link,RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as EntryKeysState from '../store/EntryKeys';

// At runtime, Redux will merge together...
type EntryKeyProps =
    EntryKeysState.EntryKeysState // ... state we've requested from the Redux store
    & typeof EntryKeysState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{keys: string }>; // ... plus incoming routing parameters


class ChartButton extends React.Component<EntryKeyProps, {}> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestEntryKeys();
      
    }

    componentWillReceiveProps(nextProps: EntryKeyProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestEntryKeys();
    }

    public render() {
        return <div>
            
            {this.renderPagination()}
        </div>
    }


    private renderPagination() {
        let prevStartDateIndex = 5;
        let nextStartDateIndex = 5;
        console.log(this.props.keys);
        const listItems = this.props.keys.map((k) =>
            <Link className='btn btn-default' to={`/fetchtransaction/${k}`}>{new Date(k).toLocaleString("pt-pt", {year:"numeric", month: "long" })}</Link>)
        return <p className='clearfix text-center'>
            {listItems}
        </p>;
    }

}
export default connect(
    (state: ApplicationState) => state.transactionKeys, // Selects which state properties are merged into the component's props
    EntryKeysState.actionCreators                 // Selects which action creators are merged into the component's props
)(ChartButton) as typeof ChartButton;
