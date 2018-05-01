import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface EntryKeysState {
    keys: Date[];
}


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestEntryKeysAction {
    type: 'REQUEST_ENTRY_KEYS';
}

interface ReceiveEntryKeysAction {
    type: 'RECEIVE_ENTRY_KEYS';
    keys: Date[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestEntryKeysAction | ReceiveEntryKeysAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestEntryKeys: (): AppThunkAction<KnownAction> => (dispatch) => {
        // Only load data if it's something we don't already have (and are not already loading)
        //if (startDateIndex !== getState().weatherForecasts.startDateIndex) {
        let fetchTask = fetch(`api/SampleData/GetKeys`)
            .then(response => response.json() as Promise<Date[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ENTRY_KEYS', keys: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_ENTRY_KEYS' });
    }
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EntryKeysState= { keys: [] };

export const reducer: Reducer<EntryKeysState> = (state: EntryKeysState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
    case 'RECEIVE_ENTRY_KEYS':
        // Only accept the incoming data if it matches the most recent request. This ensures we correctly
        // handle out-of-order responses.
            return {
                keys:action.keys
            };
    default:
        // The following line guarantees that every action in the KnownAction union has been covered by a case above
       // const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};