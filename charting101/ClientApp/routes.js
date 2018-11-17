import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import Hello from './components/HelloWorld';
import FetchTransaction from './components/FetchTransaction';
import Chartline from './components/Chartline';
import ChartButton from './components/ChartButton';
export var routes = React.createElement(Layout, null,
    React.createElement(Route, { exact: true, path: '/', component: Home }),
    React.createElement(Route, { path: '/counter', component: Counter }),
    React.createElement(Route, { path: '/fetchdata/:startDateIndex?', component: FetchData }),
    React.createElement(Route, { path: '/fetchtransaction/:startDateIndex?', component: FetchTransaction }),
    React.createElement(Route, { path: '/helloWorld', render: function () { return React.createElement(Hello, { comp: "ME" }); } }),
    React.createElement(Route, { path: '/chart', component: Chartline }),
    React.createElement(Route, { path: '/buttons', component: ChartButton }));
//# sourceMappingURL=routes.js.map