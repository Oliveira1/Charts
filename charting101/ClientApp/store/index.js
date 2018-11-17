import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as TransactionEntries from './TransactionEntries';
import * as TransactionKeys from './EntryKeys';
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export var reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    transactionEntries: TransactionEntries.reducer,
    transactionKeys: TransactionKeys.reducer
};
//# sourceMappingURL=index.js.map