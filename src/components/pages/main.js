import React from 'react';
import { Route, Link } from 'react-router-dom';

import ProductsList from './products_list';
import Navbar from './navbar';
import Cart from './cart';

const Main = () => (
    <React.Fragment>
        <Navbar />
        <Route exact path="/" component={ProductsList} />
    </React.Fragment>
);

export default Main;