"use strict"
import axios from 'axios';

// GET CART
export function getCart(){
	return function(dispatch){
		axios.get('/api/cart')
		 .then(function(response){
			 dispatch({type:"GET_CART", payload:response.data})
		 })
		 .catch(function(err){
			 dispatch({type:"GET_CART_REJECTED", msg:"error when getting the cart from session"})
		 })
	}
}

// ADD TO CART
export function addToCart(cart){
	return function(dispatch){
		axios.post("/api/cart", cart)
			.then(function(response){
				dispatch({type:"ADD_TO_CART", payload:response.data})
			})
			.catch(function(err){
				dispatch({type:"ADD_TO_CART_REJECTED", msg: 'error when adding to the cart'})
			})
	}
}

// UPDATE CART
export function updateCart(_id, unit, cart){
	// Create a copy of the current array of products
	const currentProductToUpdate = cart;
	// Determine at which index in products array is the product to be deleted
	const indexToUpdate = currentProductToUpdate.findIndex(
		function(product){
			return product._id === _id;
		}
	)

	const newProductToUpdate = {
		...currentProductToUpdate[indexToUpdate],
		quantity: currentProductToUpdate[indexToUpdate].quantity + unit
	}

	let cartUpdate = [...currentProductToUpdate.slice(0, indexToUpdate), newProductToUpdate, ...currentProductToUpdate.slice(indexToUpdate + 1)]

	return function(dispatch){
		axios.post("/api/cart", cartUpdate)
			.then(function(response){
				dispatch({type:"UPDATE_CART", payload:response.data})
			})
			.catch(function(err){
				dispatch({type:"UPDATE_CART_REJECTED", msg: 'error when adding to the cart'})
			})
	}
}

// DELETE FROM CART
export function deleteCartProduct(cart){
	return function(dispatch){
		axios.post("/api/cart", cart)
			.then(function(response){
				dispatch({type:"DELETE_CART_PRODUCT", payload:response.data})
			})
			.catch(function(err){
				dispatch({type:"DELETE_CART_PRODUCT_REJECTED", msg: 'error when deleting a product from the cart'})
			})
	}
}