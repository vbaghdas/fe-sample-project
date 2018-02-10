import React from 'react';
import { Route, Link } from 'react-router-dom';
import ItemsList from './itemsList';
import Cart from './cart';

const App = () => (
    <React.Fragment>
        <Route exact path="/" exact component={ItemsList}/>
        <Route path="/cart" component={Cart}/>
    </React.Fragment>
);

export default App;