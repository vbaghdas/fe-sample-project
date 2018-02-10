"use strict"

export function getItems() {
    return {
        type: "GET_ITEMS"
    }
}

export function postItems(item) {
    return {
        type: "POST_ITEM", 
        payload: item
    }
}

export function deleteItems(id) {
    return {
        type: "DELETE_ITEM", 
        payload: id
    }
}

export function updateItems(item) {
    return {
        type: "UPDATE_ITEM", 
        payload: item
    }
}