var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as TransactionEntriesState from '../store/TransactionEntries';
var FetchTransaction = (function (_super) {
    __extends(FetchTransaction, _super);
    function FetchTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FetchTransaction.prototype.componentWillMount = function () {
        // This method runs when the component is first added to the page parseInt(this.props.match.params.startDateIndex) 
        var startDateIndex = this.props.match.params.startDateIndex || new Date().toISOString();
        this.props.requestTransactionEntries(startDateIndex);
    };
    FetchTransaction.prototype.componentWillReceiveProps = function (nextProps) {
        // This method runs when incoming props (e.g., route params) change parseInt(nextProps.match.params.startDateIndex) || 
        var startDateIndex = this.props.match.params.startDateIndex || new Date().toISOString();
        this.props.requestTransactionEntries(startDateIndex);
    };
    FetchTransaction.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("h1", null, "Monthly transactions"),
            React.createElement("p", null, "This component demonstrates fetching data from the server and working with URL parameters."),
            this.renderEntriesTable());
    };
    FetchTransaction.prototype.renderEntriesTable = function () {
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "ID"),
                    React.createElement("th", null, "Data"),
                    React.createElement("th", null, "Quantidade"),
                    React.createElement("th", null, "Saldo"),
                    React.createElement("th", null, "Descri\uFFFD\uFFFDo"))),
            React.createElement("tbody", null, this.props.entries.map(function (entry) {
                return React.createElement("tr", { key: entry.id },
                    React.createElement("td", null, entry.id),
                    React.createElement("td", null, entry.date),
                    React.createElement("td", null, entry.amount),
                    React.createElement("td", null, entry.saldo),
                    React.createElement("td", null, entry.description));
            })));
    };
    FetchTransaction.prototype.renderPagination = function () {
        var prevStartDateIndex = 0; //(this.props.startDateIndex || 0) - 5;
        var nextStartDateIndex = 5; //(this.props.startDateIndex || 0) + 5;
        return React.createElement("p", { className: 'clearfix text-center' },
            React.createElement(Link, { className: 'btn btn-default pull-left', to: "/fetchtransaction/" + prevStartDateIndex }, "Previous"),
            React.createElement(Link, { className: 'btn btn-default pull-right', to: "/fetchtransaction/" + nextStartDateIndex }, "Next"));
    };
    return FetchTransaction;
}(React.Component));
export default connect(function (state) { return state.transactionEntries; }, // Selects which state properties are merged into the component's props
TransactionEntriesState.actionCreators // Selects which action creators are merged into the component's props
)(FetchTransaction);
//# sourceMappingURL=FetchTransaction.js.map