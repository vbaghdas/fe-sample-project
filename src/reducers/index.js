"use strict"
import {combineReducers} from 'redux';
import {itemsReducers} from './items_reducers';
import {cartReducers} from './cart_reducers';

export default combineReducers({
    items: itemsReducers,
    cart: cartReducers
})