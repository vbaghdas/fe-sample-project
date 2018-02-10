"use strict"

export function addToCart(item) {
    return {
        type: "ADD_TO_CART", 
        payload: item
    }
}

export function updateCart(_id, unit) {
    return {
        type: "UPDATE_CART", 
        _id: _id,
        unit: unit
    }
}

export function deleteCartItem(cart) {
    return {
        type: "DELETE_CART_ITEM", 
        payload: cart
    }
}