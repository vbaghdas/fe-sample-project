"use strict"
import {combineReducers} from 'redux';
import {productsReducers} from './products_reducers';
import {cartReducers} from './cart_reducers';

export default combineReducers({
    products: productsReducers,
    cart: cartReducers
})