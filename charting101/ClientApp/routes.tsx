import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import Hello from './components/HelloWorld';
import ChartElement from './components/ChartElement';
import FetchTransaction from './components/FetchTransaction';
import Chartline from './components/Chartline';
import ChartButton from './components/ChartButton';



export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/fetchtransaction/:startDateIndex?' component={FetchTransaction} />
    <Route path='/helloWorld' render={() => <Hello comp="ME" />} />
    <Route path='/chart' component={Chartline} />
    <Route path='/buttons' component={ ChartButton } />

</Layout>;




