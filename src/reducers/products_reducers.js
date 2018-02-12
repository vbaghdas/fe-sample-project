/*==========================================================
            PRODUCTS REDUCERS SERVER SIDE

To enable server side rendering of products, rename this file 
to products_reducers.js and rename the client side to 
products_reducers_client.js so it does not load.
===========================================================*/

"use strict"

export function productsReducers(state={products:[]}, action){
	switch(action.type){
		case "GET_PRODUCTS":
			return {...state, products: [...action.payload]}
            break;
            
		case "POST_PRODUCT":
			return {...state, products: [...state.products, ...action.payload], msg:'Saved! Click to continue'}
            break;
            
		case "POST_PRODUCT_REJECTED":
			return {...state, msg:'Please, try again'}
            break;
            
		case "DELETE_PRODUCT":
			const currentProductToDelete = [...state.products]
			const indexToDelete = currentProductToDelete.findIndex(
				function(product){
					return product._id == action.payload;
                }
            )
			return {products: [...currentProductToDelete.slice(0, indexToDelete), ...currentProductToDelete.slice(indexToDelete + 1)]}
		break;

		case "UPDATE_PRODUCT":
			const currentProductToUpdate = [...state.products]
			const indexToUpdate = currentProductToUpdate.findIndex(
				function(product){
					return product._id === action.payload._id;
				}
			)
			const newProductToUpdate = {
				...currentProductToUpdate[indexToUpdate],
				name: action.payload.name
			}
			return {products: [...currentProductToUpdate.slice(0, indexToUpdate), newProductToUpdate, ...currentProductToUpdate.slice(indexToUpdate + 1)]}
		break;
	}
	return state;
}