import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TransactionEntriesState {
    startDateIndex?: Date;
    entries: TransactionEntry[];
}

export interface TransactionEntry {
    id: number;
    date: string;
    opDate: string;
    description: string;
    amount: number;
    currency: string;
    saldo: number;
    cur: string;
    
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestTransactionEntriesAction {
    type: 'REQUEST_TRANSACTION_ENTRIES';
    startDateIndex: Date;
}

interface ReceiveTransactionEntriesAction {
    type: 'RECEIVE_TRANSACTION_ENTRIES';
    startDateIndex: Date;
    entries: TransactionEntry[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestTransactionEntriesAction | ReceiveTransactionEntriesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTransactionEntries: (startDateIndex: Date): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        //let stateDate : any;
        let stateDate =getState().transactionEntries.startDateIndex ;
        if (!stateDate || ( startDateIndex.getUTCDate() !== stateDate.getUTCDate() && startDateIndex.getUTCMonth()!== stateDate.getUTCMonth() && startDateIndex.getUTCFullYear() !== stateDate.getUTCFullYear() )) {
            let dt=startDateIndex;
            let fetchTask = fetch(`api/SampleData/TransactionEntries?startDateIndex=${ dt.toISOString() }`)
                .then(response => response.json() as Promise<TransactionEntry[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRANSACTION_ENTRIES', startDateIndex: startDateIndex, entries: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_TRANSACTION_ENTRIES', startDateIndex: startDateIndex });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TransactionEntriesState = { entries: [] };

export const reducer: Reducer<TransactionEntriesState> = (state: TransactionEntriesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
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
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
