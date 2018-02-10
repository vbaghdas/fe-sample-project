"use strict"
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

import Index from './components/pages';

render(
    <Provider store={store}>
        <Router>
            <React.Fragment>
                <Index />
            </React.Fragment>
        </Router>
    </Provider>,
    document.getElementById('app')
);