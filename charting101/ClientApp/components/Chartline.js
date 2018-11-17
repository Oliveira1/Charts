// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
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
import * as React from "react";
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import * as TransactionEntriesState from '../store/TransactionEntries';
var total = 0;
var entries = [];
var Chartline = (function (_super) {
    __extends(Chartline, _super);
    function Chartline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chartline.prototype.componentWillMount = function () {
        // This method runs when the component is first added to the page
        var startDateIndex = this.props.match.params.startDateIndex || new Date().toISOString();
        // console.log("COCO", this.props.actions.counterActions.requestTransactionEntries(0)) = parseInt(this.props.match.params.startDateIndex) || 0;;
        //console.log("AHN", this.props.transactionEntries);
        //this.props.actions.counterActions.requestTransactionEntries(startDateIndex);
        this.props.requestTransactionEntries(startDateIndex);
        //entries = this.props.transactionEntries.entries;
        entries = this.props.entries;
        total = entries.length;
    };
    Chartline.prototype.componentWillReceiveProps = function (nextProps) {
        // This method runs when incoming props (e.g., route params) change
        var startDateIndex = nextProps.match.params.startDateIndex || new Date().toISOString();
        //console.log("AHN", this.props.transactionEntries); = parseInt(nextProps.match.params.startDateIndex) || 0;
        //this.props.actions.counterActions.requestTransactionEntries(startDateIndex);
        //entries = this.props.transactionEntries.entries; dot={true} label={{ fill: 'red', fontSize: 20 }}  />
        this.props.requestTransactionEntries(startDateIndex);
        entries = this.props.entries;
        total = entries.length;
    };
    Chartline.prototype.render = function () {
        return (React.createElement(LineChart, { width: 2800, height: 900, data: entries, margin: { top: 5, right: 30, left: 20, bottom: 5 } },
            React.createElement(XAxis, { interval: 0, dataKey: "date" }),
            React.createElement(YAxis, { interval: 0, type: "number", domain: ['dataMin', 'dataMax'] }),
            React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
            React.createElement(Tooltip, null),
            React.createElement(Legend, null),
            React.createElement(Line, { type: "monotone", dataKey: "saldo", stroke: "#8884d8" })));
    };
    return Chartline;
}(React.Component));
export default connect(function (state) { return state.transactionEntries; }, // Selects which state properties are merged into the component's props
TransactionEntriesState.actionCreators // Selects which action creators are merged into the component's props
)(Chartline);
//# sourceMappingURL=Chartline.js.map