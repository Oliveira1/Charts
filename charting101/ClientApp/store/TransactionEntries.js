import { fetch, addTask } from 'domain-task';
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export var actionCreators = {
    requestTransactionEntries: function (startDateIndex) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        //let stateDate : any;
        var stateDate = getState().transactionEntries.startDateIndex;
        var sd = new Date(stateDate || new Date());
        var sdi = new Date(startDateIndex);
        if (sdi.getUTCMonth() !== sd.getUTCMonth() || sdi.getUTCFullYear() !== sd.getUTCFullYear()) {
            var fetchTask = fetch("api/SampleData/TransactionEntries?startDateIndex=" + sdi.toISOString())
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_TRANSACTION_ENTRIES', startDateIndex: startDateIndex, entries: data });
            });
            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_TRANSACTION_ENTRIES', startDateIndex: startDateIndex });
        }
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { entries: [] };
export var reducer = function (state, incomingAction) {
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_TRANSACTION_ENTRIES':
            return {
                startDateIndex: action.startDateIndex,
                entries: state.entries,
            };
        case 'RECEIVE_TRANSACTION_ENTRIES':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    entries: action.entries,
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};
//# sourceMappingURL=TransactionEntries.js.map