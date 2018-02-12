"use strict"
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import Main from './components/pages/main';

render(
    <Provider store={store}>
        <Router>
            <React.Fragment>
                <Main />
            </React.Fragment>
        </Router>
    </Provider>,
    document.getElementById('app')
);