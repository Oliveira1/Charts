import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as TransactionEntriesState from '../store/TransactionEntries';

// At runtime, Redux will merge together...
type TransactionEntryProps =
    TransactionEntriesState.TransactionEntriesState       // ... state we've requested from the Redux store
    & typeof TransactionEntriesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

class FetchTransaction extends React.Component<TransactionEntryProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        this.props.requestTransactionEntries(startDateIndex);
    }

    componentWillReceiveProps(nextProps: TransactionEntryProps) {
        // This method runs when incoming props (e.g., route params) change
        let startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;
        this.props.requestTransactionEntries(startDateIndex);
    }

    public render() {
        return <div>
            <h1>Monthly transactions</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
            { this.renderEntriesTable() }
            { this.renderPagination() }
        </div>;
    }

    private renderEntriesTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Quantidade</th>
                    <th>Saldo</th>
                    <th>Descri��o</th>
                </tr>
            </thead>
            <tbody>
                {this.props.entries.map(entry =>
                    <tr key={entry.id}>
                        <td>{entry.id}</td>
                        <td>{entry.date}</td>
                        <td>{entry.amount}</td>
                        <td>{entry.saldo}</td>
                        <td>{entry.description}</td>
                </tr>
            )}
            </tbody>
        </table>;
    }

    private renderPagination() {
        let prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        let nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

        return <p className='clearfix text-center'>
            <Link className='btn btn-default pull-left' to={ `/fetchtransaction/${ prevStartDateIndex }` }>Previous</Link>
            <Link className='btn btn-default pull-right' to={ `/fetchtransaction/${ nextStartDateIndex }` }>Next</Link>
            { this.props.isLoading ? <span>Loading...</span> : [] }
        </p>;
    }
}

export default connect(
    (state: ApplicationState) => state.transactionEntries, // Selects which state properties are merged into the component's props
    TransactionEntriesState.actionCreators                 // Selects which action creators are merged into the component's props
)(FetchTransaction) as typeof FetchTransaction;
