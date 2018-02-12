/*==========================================================
            PRODUCTS REDUCERS CLIENT SIDE

To enable cient side rendering of products, rename this file 
to products_reducers.js and rename the server side to 
products_reducers_server.js so it does not load.
===========================================================*/

"use strict"
import productPayload from '../../product-payload.json';

export function productsReducers(state={...productPayload}, action) {
    switch(action.type){
        case "GET_PRODUCT":
            return {...state, products: [...action.payload]};
            
        case "POST_PRODUCT":
            return {products: [...state.products, ...action.payload]};
            break;
            
        case "DELETE_PRODUCT":
            const currentProductToDelete = [...state.products];
            const indexToDelete = currentProductToDelete.findIndex(
                (product) => {
                    return product._id === action.payload;
                }
            )
            return {products: [...currentproductToDelete.slice(0, indexToDelete), ...currentproductToDelete.slice(indexToDelete + 1)]}
            break;

        case "UPDATE_PRODUCT":
            const currentproductToUpdate = [...state.products];
            const indexToUpdate = currentproductToUpdate.findIndex(
                (product) => {
                    return product._id === action.payload._id;
                }
            )
            const newproductToUpdate = {
                ...currentproductToUpdate[indexToUpdate],
                title: action.payload.title
            }
            return {products: [...currentproductToUpdate.slice(0, indexToUpdate), newproductToUpdate, ...currentproductToUpdate.slice(indexToUpdate + 1)]}
            break;
    }
    return state;
}