"use strict"
import {combineReducers} from 'redux';
import {itemsReducers} from './itemsReducers';
import {cartReducers} from './cartReducers';

export default combineReducers({
    items: itemsReducers,
    cart: cartReducers
})