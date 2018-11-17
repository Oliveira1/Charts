import { fetch, addTask } from 'domain-task';
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export var actionCreators = {
    requestEntryKeys: function () { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        //if (startDateIndex !== getState().weatherForecasts.startDateIndex) {
        if (getState().transactionKeys.keys.length == 0) {
            var fetchTask = fetch("api/SampleData/GetKeys")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_ENTRY_KEYS', keys: data });
            });
            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_ENTRY_KEYS' });
        }
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { keys: [] };
export var reducer = function (state, incomingAction) {
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_ENTRY_KEYS':
            return { keys: state.keys };
        case 'RECEIVE_ENTRY_KEYS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                keys: action.keys
            };
        default:
    }
    return state || unloadedState;
};
//# sourceMappingURL=EntryKeys.js.map