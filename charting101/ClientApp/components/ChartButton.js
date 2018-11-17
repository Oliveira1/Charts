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
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as EntryKeysState from '../store/EntryKeys';
var ChartButton = (function (_super) {
    __extends(ChartButton, _super);
    function ChartButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChartButton.prototype.componentWillMount = function () {
        // This method runs when the component is first added to the page
        this.props.requestEntryKeys();
    };
    ChartButton.prototype.componentWillReceiveProps = function (nextProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestEntryKeys();
    };
    ChartButton.prototype.render = function () {
        return React.createElement("div", null, this.renderPagination());
    };
    ChartButton.prototype.renderPagination = function () {
        var prevStartDateIndex = 5;
        var nextStartDateIndex = 5;
        console.log(this.props.keys);
        var listItems = this.props.keys.map(function (k) {
            return React.createElement(Link, { className: 'btn btn-default', to: "/fetchtransaction/" + k }, new Date(k).toLocaleString("pt-pt", { year: "numeric", month: "long" }));
        });
        return React.createElement("p", { className: 'clearfix text-center' }, listItems);
    };
    return ChartButton;
}(React.Component));
export default connect(function (state) { return state.transactionKeys; }, // Selects which state properties are merged into the component's props
EntryKeysState.actionCreators // Selects which action creators are merged into the component's props
)(ChartButton);
//# sourceMappingURL=ChartButton.js.map